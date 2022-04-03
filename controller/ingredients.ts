/**
 * @name 		Ingredient
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Ingredients' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { Ingredient, IIngredient } from '../models/ingredient'
import { ingredients } from '../data/ingredients'
import { TRequest, CreateGenericRoute } from './generic'
import { Request, Response } from 'express'

/**
 * A Request that fetches all ingredients from the collection
 */
export const GetIngredients: TRequest = CreateGenericRoute<IIngredient>(
	Ingredient,
	'ingredients',
	Object.keys(ingredients[0]) || []
)

/**
 * Create a new **unique** ingredient
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - the updated collection
 */
export const CreateIngredient = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const ingredient: IIngredient = req.body

		// check if ingredient is not null|undefined
		if (ingredient) {
			// create ingredient and return updated collection
			await Ingredient.create(ingredient)
			const ingredients: Array<IIngredient> = await Ingredient.find({})

			return res.status(201).send({ success: true, data: ingredients })
		} else
			return res
				.status(400)
				.json({ success: false, message: 'Please provide an ingredient' })
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err || 'Failed to create an ingredient',
		})
	}
}

/**
 * Updates the ingredient of the given **_id** with the provided ingredient in the body
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const UpdateIngredient = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params
	const ingredient: IIngredient = req.body

	try {
		if (ingredient) {
			// update the ingredient
			const found = await Ingredient.findByIdAndUpdate(id, ingredient, {
				runValidators: true,
			})

			if (found) {
				const mutated: Array<IIngredient> = await Ingredient.find({})
				return res.status(200).json({ success: true, data: mutated })
			} else
				return res.status(400).json({
					success: false,
					message: `An id of
							${id}
							yields no ingredient and cannot be mutated`,
				})
		} else
			return res.status(400).json({
				success: false,
				message: 'Request body contains no ingredient!',
			})
	} catch (err) {
		return res.status(400).json({
			success: false,
			message: err || 'Failed to update!',
		})
	}
}

/**
 * Deletes the ingredient with the provided **_id** should it exist
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const DeleteIngredient = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params

	try {
		const ingredient: IIngredient = await Ingredient.findByIdAndRemove(id)

		if (ingredient) {
			const mutated: Array<IIngredient> = await Ingredient.find({})
			return res.status(200).json({ success: true, data: mutated })
		} else
			return res.status(404).json({
				success: false,
				message: `An id of ${id} yields no ingredient and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(400)
			.json({ success: false, message: err || 'Failed to delete ingredient!' })
	}
}
