import { Ingredient, IIngredient } from '../models/ingredient'
import { Request, Response } from 'express'

/**
 * Sanitize the contents of an ingredient type
 * @param { IIngredientRequest } ingredient - ingredient to sanitize
 * @returns { IIngredientRequest } IIngredientRequest
 */
const mSanitizeIngredient = (ingredient: IIngredient): IIngredient => ({
	...ingredient,
	name: ingredient.name.toLowerCase().trim(),
})

/**

/**
 * Gets **all** ingredients from the database
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns all ingredients in the collection
 */
export const GetIngredients = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const ingredients: Array<IIngredient> = await Ingredient.find({})
		return res.status(200).json({ success: 1, data: ingredients })
	} catch (err) {
		return res.status(500).json({
			msg: err.message || 'ingredients could not be fetched',
		})
	}
}

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
			const sanitizedIngredient = mSanitizeIngredient(ingredient)

			// check if ingredient is unique
			const exists: IIngredient = await Ingredient.findOne({
				name: sanitizedIngredient.name.toLowerCase().trim(),
			})

			if (!exists) {
				// create ingredient and return updated collection
				await Ingredient.create(sanitizedIngredient)
				const ingredients: Array<IIngredient> = await Ingredient.find({})

				return res.status(201).send({ success: true, data: ingredients })
			} else
				return res
					.status(409)
					.send({ success: false, msg: 'ingredient was not unique' })
		} else
			return res
				.status(201)
				.json({ success: false, msg: 'Please provide a name' })
	} catch (err) {
		// managed exception, return err
		return res.status(409).json({
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
			const sanitizedIngredient: IIngredient = mSanitizeIngredient(ingredient)

			// test if the updated name
			const exists: IIngredient = await Ingredient.findOne({
				name: sanitizedIngredient.name.toLowerCase().trim(),
			})

			if (!exists) {
				// update the ingredient
				const found = await Ingredient.findByIdAndUpdate(
					id,
					sanitizedIngredient
				)

				if (found) {
					const mutated: Array<IIngredient> = await Ingredient.find({})
					return res.status(200).json({ success: true, data: mutated })
				} else
					return res.status(400).json({
						success: false,
						msg: `An id of
							${id}
							yields no ingredient and cannot be mutated`,
					})
			} else
				return res.status(409).json({
					success: false,
					msg: 'mutation must return a unique set',
				})
		} else
			return res.status(403).json({
				success: 0,
				msg: 'Request body contains no ingredient!',
			})
	} catch (err) {
		return res.status(403).json({
			success: false,
			msg: err || 'Failed to update!',
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
				msg: `An id of ${id} yields no ingredient and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(404)
			.json({ success: false, msg: err || 'Failed to delete ingredient!' })
	}
}
