/**
 * @name 		Generic
 * @author 		Aardhyn Lavender
 *
 * @description Provides template typed routes for CRUD controllers
 */

import { Model } from 'mongoose'
import { Request, Response } from 'express'
import { Types, FilterQuery } from 'mongoose'

/**
 * A function that accepts a `request` and provides a `response` promising `anything`
 */
export type TRequest = (req: Request, res: Response) => Promise<any>

export enum Polarity {
	'asc',
	'desc',
}

export interface IQueryParams {
	id?: Types.ObjectId | undefined
	sort?: string
	page: number
	pageSize: number
	polarity: Polarity
	limit?: number
}

export const DefaultParams: IQueryParams = {
	page: 0,
	pageSize: 12,
	polarity: Polarity.asc,
}

/**
 * Generates a route that gets `TObject` document(s) from a `Model<TObject>` collection
 * @param { Model<TObject> } collection collection to query
 * @param { String } collectionName **plural** name of the collection
 * @param { Array<string> } interrogable array of properties that can be interrogated -- filtered and sorted by
 * @returns A `TRequest` that responds `TObject` data from a `Model<TObject>` based on a request
 */
export const CreateGenericGet =
	<TObject>(
		collection: Model<TObject>,
		collectionName: string = 'objects',
		interrogable: Array<string> = []
	): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		try {
			const { id } = req.params
			const queryParams: IQueryParams = { ...DefaultParams, ...req.query }

			if (id) {
				const object: TObject | undefined = await collection.findById(id)

				// return an appropriate status message
				return res.status(200).json({
					success: !!object,
					[object ? 'data' : 'message']:
						object ||
						`An id of ${id} yields no ${collectionName.substring(
							0,
							collectionName.length - 1
						)}!`,
				})
			} else {
				// extract query params that are interrogable
				const filters: FilterQuery<TObject> = Object.keys(queryParams)
					.filter((property: string) => interrogable.includes(property))
					.reduce(
						(
							filter: { [property in keyof TObject]?: any },
							property: string
						) => ({
							...filter,
							[property]: queryParams[property],
						}),
						{}
					)

				// validate the sort parameter is interrogable
				const sortProperty: string | undefined = interrogable.includes(
					queryParams?.sort
				)
					? queryParams?.sort
					: undefined

				// filter, paginate, and sort objects based on query parameters
				const objects: Array<TObject> = await collection
					.find(filters)
					.sort({ [sortProperty]: queryParams.polarity })
					.skip(queryParams.page * queryParams.pageSize)
					.limit(queryParams.limit || queryParams.pageSize)

				// return appropriate success message
				return res.status(200).json({
					success: true,
					data: objects.length
						? objects
						: `No ${collectionName} match the provided query`, // I feel no objects is still successful; we successfully matched the query
				})
			}
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: err.message || `${collectionName} could not be fetched`,
			})
		}
	}

/**
 * Generates a route that adds a `TObject` document to a `Model<TObject>` collection
 * @param { Model<TObject> } collection collection to query
 * @param { String } objectType name of the object type -- for responses and logging
 * @returns A route that adds a `TObject` document to a `Model<TObject>` collection
 */
export const CreateGenericPost =
	<TObject>(
		collection: Model<TObject>,
		objectType: string = 'object'
	): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		try {
			const object: TObject = req.body

			if (object) {
				// create ingredient and return updated collection
				await collection.create(object)
				const objects: Array<TObject> = await collection.find({})

				return res.status(201).send({ success: true, data: objects })
			} else
				return res.status(400).json({
					success: false,
					message: `Please provide a ${objectType}`,
				})
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: err || `Failed to create ${objectType}`,
			})
		}
	}

/**
 * Generates a route that updates `TObject` documents in a `Model<TObject>` collection
 * @param { Model<TObject> } collection collection to query
 * @param { String } objectType name of the object type -- for responses and logging
 * @returns A route that updates `TObject` documents in a `Model<TObject>` collection
 */
export const CreateGenericPut =
	<TObject>(
		collection: Model<TObject>,
		objectType: string = 'object'
	): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		const { id } = req.params
		const object: TObject = req.body

		try {
			if (object) {
				const found = await collection.findByIdAndUpdate(id, object, {
					runValidators: true,
				})

				if (found) {
					const mutated: Array<TObject> = await collection.find({})
					return res.status(200).json({ success: true, data: mutated })
				} else
					return res.status(400).json({
						success: false,
						message: `An id of ${id} yields no ${objectType} and cannot be mutated`,
					})
			} else
				return res.status(400).json({
					success: false,
					message: `Request body contains no ${objectType}!`,
				})
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: err || 'Failed to update!',
			})
		}
	}

/**
 * Generates a route that deletes `TObject` documents from a `Model<TObject>` collection
 * @param { Model<TObject> } collection collection to query
 * @param { String } objectType name of the object type -- for responses and logging
 * @returns A route that deletes `TObject` documents from a `Model<TObject>` collection
 */
export const CreateGenericDelete =
	<TObject>(
		collection: Model<TObject>,
		objectType: string = 'object'
	): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		const { id } = req.params

		try {
			const object: TObject = await collection.findByIdAndRemove(id)

			if (object) {
				const mutated: Array<TObject> = await collection.find({})
				return res.status(200).json({
					success: true,
					data: mutated.length
						? mutated
						: `No ${objectType} documents remain in the collection`,
				})
			} else
				return res.status(404).json({
					success: false,
					message: `An id of ${id} yields no ${objectType} and cannot be deleted`,
				})
		} catch (err) {
			return res.status(404).json({
				success: false,
				message: err || `Failed to delete ${objectType}!`,
			})
		}
	}
