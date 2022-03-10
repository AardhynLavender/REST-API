import { Schema, Model, model } from 'mongoose'

export interface IIngredient {
	name: string
}

const ingredient: Schema<IIngredient> = new Schema<IIngredient>({
	name: { type: String, required: true },
})

export const Ingredient: Model<IIngredient> = model('Ingredient', ingredient)
