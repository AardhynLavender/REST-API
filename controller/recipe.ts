/**
 * @name 		Recipe
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Recipe' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter recipes
 * 				in the database.
 */

import { Recipe, IRecipe } from '../models/recipe'
import { Request, Response } from 'express'

/**
 * Gets **all** recipe from the database
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns all recipes in the collection
 */
export const GetRecipes = async (req: Request, res: Response): Promise<any> => {
	try {
		const recipes: Array<IRecipe> = await Recipe.find({})
		return res.status(200).json({ success: true, data: recipes })
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: err.message || 'recipes could not be fetched',
		})
	}
}

/**
 * Create a new recipe
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - the updated collection
 */
export const CreateRecipe = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const recipe: IRecipe = req.body

		// check if recipe is not null|undefined
		if (recipe) {
			// create recipe and return updated collection
			await Recipe.create(recipe)
			const recipes: Array<IRecipe> = await Recipe.find({})

			return res.status(201).send({ success: true, data: recipes })
		} else
			return res
				.status(201)
				.json({ success: false, message: 'Please provide a recipe' })
	} catch (err) {
		return res.status(409).json({
			success: false,
			message: err || 'Failed to create recipe',
		})
	}
}

/**
 * Updates the recipe of the given **_id** with the provided component in the body
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const UpdateRecipe = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params
	const recipe: IRecipe = req.body

	try {
		if (recipe) {
			const found = await Recipe.findByIdAndUpdate(id, recipe, {
				runValidators: true,
			})

			if (found) {
				const mutated: Array<IRecipe> = await Recipe.find({})
				return res.status(200).json({ success: true, data: mutated })
			} else
				return res.status(400).json({
					success: false,
					message: `An id of
                            ${id}
                            yields no recipe and cannot be mutated`,
				})
		} else
			return res.status(403).json({
				success: 0,
				message: 'Request body contains no recipe!',
			})
	} catch (err) {
		return res.status(403).json({
			success: false,
			message: err || 'Failed to update!',
		})
	}
}

/**
 * Deletes the recipe with the provided **_id** should it exist
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const DeleteRecipe = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params

	try {
		const recipe: IRecipe = await Recipe.findByIdAndRemove(id)

		if (recipe) {
			const mutated: Array<IRecipe> = await Recipe.find({})
			return res.status(200).json({ success: true, data: mutated })
		} else
			return res.status(404).json({
				success: false,
				message: `An id of ${id} yields no recipe and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(404)
			.json({ success: false, message: err || 'Failed to delete recipe!' })
	}
}
