import { Schema, Model, model } from 'mongoose'

export interface IIngredient {
	name: string
	description?: string
	brand?: string
	type?: string
	expiry?: Date
}

const ingredient: Schema<IIngredient> = new Schema<IIngredient>({
	name: { type: String, required: true, unique: true, maxlength: 20 },
	description: { type: String, required: false, maxlength: 200 },
	brand: { type: String, required: false, maxlength: 20 },
	type: { type: String, required: false, maxlength: 20 },
	expiry: { type: Date, required: false },
})

export const Ingredient: Model<IIngredient> = model('Ingredient', ingredient)
