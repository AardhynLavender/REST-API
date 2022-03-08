import { Document, Schema, Model, model } from 'mongoose'

export interface IIngredient extends Document {
	name: string
}

const ingredient = new Schema<IIngredient>({
	name: { type: String, required: true },
})

export const Ingredient: Model<IIngredient> = model('Ingredient', ingredient)
