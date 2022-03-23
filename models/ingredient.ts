/**
 * @name 		Ingredient
 * @author 		Aardhyn Lavender
 *
 * @description Define schema and model interfaces and Mongoose types
 */

import { Schema, Model, model, ObjectId } from 'mongoose'

// Interfaces /////////////////////////////////////////////

export interface IIngredient {
	_id: ObjectId
	name: string
	description?: string
	brand?: string
	type?: string
	expiry?: Date
}

// Schemas ////////////////////////////////////////////////

const ingredient: Schema<IIngredient> = new Schema<IIngredient>({
	name: { type: String, required: true, unique: true, maxlength: 20 },
	description: { type: String, required: false, maxlength: 200 },
	brand: { type: String, required: false, maxlength: 20 },
	type: { type: String, required: false, maxlength: 20 },
	expiry: { type: Date, required: false },
})

// Models /////////////////////////////////////////////////

export const Ingredient: Model<IIngredient> = model('Ingredient', ingredient)
