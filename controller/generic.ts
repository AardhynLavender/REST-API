/**
 * @name 		Generic
 * @author 		Aardhyn Lavender
 *
 * @description Provides templated routes for controllers
 */

import { Model } from 'mongoose'
import { Request, Response } from 'express'
import { Types, FilterQuery } from 'mongoose'
import { IOType } from 'child_process'

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
 * Generates a routes that returns all `TObject` from the `TCollection` collection
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @param { Array<string> } interrogable array of properties that can be interrogated -- filtered and sorted by
 * @returns all `TObject` in the collection
 */
export const CreateGenericRoute =
	<TObject>(
		collection: Model<TObject>,
		objectName: string = 'nameless Collection',
		interrogable: Array<string> = []
	): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		try {
			const queryParams: IQueryParams = { ...DefaultParams, ...req.query }

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

			return res.status(200).json({ success: true, data: objects })
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: err.message || `${objectName} could not be fetched`,
			})
		}
	}
