/**
 * @name 		Utensil
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Utensils' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { Utensil, IUtensil } from '../models/utensil'
import { utensils } from '../data/utensils'
import { Request, Response } from 'express'
import { TRequest, CreateGenericGet } from './generic'

/**
 * A Request that fetches all utensils from the collection
 */
export const GetUtensils: TRequest = CreateGenericGet<IUtensil>(
	Utensil,
	'utensils',
	Object.keys(utensils[0]) || []
)

/**
 * Create a new **unique** ingredient
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - the updated collection
 */
export const CreateUtensil = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const utensil: IUtensil = req.body

		if (utensil) {
			await Utensil.create(utensil)
			const utensils: Array<IUtensil> = await Utensil.find({})

			return res.status(201).send({ success: true, data: utensils })
		} else
			return res
				.status(201)
				.json({ success: false, message: 'Please provide a utensil' })
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err || 'Failed to create utensil',
		})
	}
}

/**
 * Updates the utensil of the given **_id** with the provided utensil in the body
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const UpdateUtensil = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params
	const utensil: IUtensil = req.body

	try {
		if (utensil) {
			// update the ingredient
			const found = await Utensil.findByIdAndUpdate(id, utensil, {
				runValidators: true,
			})

			if (found) {
				const mutated: Array<IUtensil> = await Utensil.find({})
				return res.status(200).json({ success: true, data: mutated })
			} else
				return res.status(400).json({
					success: false,
					message: `An id of
							${id}
							yields no utensil and cannot be mutated`,
				})
		} else
			return res.status(403).json({
				success: 0,
				message: 'Request body contains no utensil!',
			})
	} catch (err) {
		return res.status(403).json({
			success: false,
			message: err || 'Failed to update!',
		})
	}
}

/**
 * Deletes the utensil with the provided **_id** should it exist
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const DeleteUtensil = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params

	try {
		const utensil: IUtensil = await Utensil.findByIdAndRemove(id)

		if (utensil) {
			const mutated: Array<IUtensil> = await Utensil.find({})
			return res.status(200).json({ success: true, data: mutated })
		} else
			return res.status(404).json({
				success: false,
				message: `An id of ${id} yields no utensil and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(400)
			.json({ success: false, message: err || 'Failed to delete utensil!' })
	}
}
