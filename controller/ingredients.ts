import { Ingredient, IIngredient } from '../models/ingredient'
import { Request, Response } from 'express'

interface IIngredientRequest {
	name: string
}

const mSanitizeIngredient = (
	ingredient: IIngredientRequest
): IIngredientRequest => ({
	...ingredient,
	name: ingredient.name.toLowerCase().trim(),
})

export const GetIngredients = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	console.log('Called!')
	try {
		const ingredients: Array<IIngredient> = await Ingredient.find({})
		return res.status(200).json({ success: 1, data: ingredients })
	} catch (err) {
		return res.status(500).json({
			msg: err.message || 'ingredients could not be fetched',
		})
	}
}

export const CreateIngredient = async (
	req: Request,
	res: Response
): Promise<Response<any>> => {
	try {
		const ingredient: IIngredientRequest = req.body

		// check if ingredient is not null|undefined
		if (ingredient) {
			// sanitize input -- remove capitalized characters and trim whitespace
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
		res.status(409).json({
			success: false,
			message: err || 'Failed to create an ingredient',
		})
	}
}

export const UpdateIngredient = async (req, res) => {
	const { id } = req.params
	const ingredient = req.body
	try {
		if (ingredient) {
			const sanitizedIngredient: IIngredientRequest =
				mSanitizeIngredient(ingredient)

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
					const mutated = await Ingredient.find({})
					return res.status(200).json({ success: 1, data: mutated })
				} else
					return res.status(400).json({
						success: 0,
						msg:
							"An id of '" +
							id +
							"' yields no ingredient and cannot be mutated",
					})
			} else
				res.status(409).json({
					success: 0,
					msg: 'mutation must return a unique set',
				})
		} else
			res.status(403).json({
				success: 0,
				msg: 'Request body contains no ingredient!',
			})
	} catch (err) {
		console.log(err)
		return res.status(403).json({
			success: 0,
			msg: err || 'Failed to update!',
		})
	}
}

export const DeleteIngredient = async (req, res) => {
	const { id } = req.params
	try {
		const ingredient = await Ingredient.findByIdAndRemove(id)

		if (ingredient) {
			const mutated = await Ingredient.find({})
			return res.status(200).json({ success: 1, data: mutated })
		} else
			return res.status(404).json({
				success: 0,
				msg: "An id of '" + id + "' yields no ingredient and cannot be deleted",
			})
	} catch (err) {
		return res
			.status(404)
			.json({ success: 0, msg: err || 'Failed to delete ingredient' })
	}
}
