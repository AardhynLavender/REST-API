/**
 * @name 		Recipe
 * @author 		Aardhyn Lavender
 *
 * @description Define schema and model interfaces and Mongoose types
 */

import { Types, Schema, Model, model, ObjectId } from 'mongoose'
import { CreateObjectValidator } from '../utils/relationshipValidation'
import { IUser, User } from './user'
import { Component, IComponent } from './component'

// Interfaces ////////////////////////////////////////////////

/**
 * Defines a collection of components into a recipe
 */
export interface IRecipe {
	_id?: Types.ObjectId
	name: string
	author: Types.ObjectId
	authored: Date
	components: Array<Types.ObjectId>
	detail?: string
}

// Schemas ///////////////////////////////////////////////////

const recipe: Schema<IRecipe> = new Schema<IRecipe>({
	name: { type: String, unique: true, required: true, maxlength: 20 },
	author: {
		ref: 'User',
		type: Schema.Types.ObjectId,
		required: true,
		validate: {
			validator: CreateObjectValidator<IUser, IUser>(User),
			message: 'Could not find author!',
		},
	},
	authored: { type: Date, required: false },
	components: [
		{
			ref: 'Component',
			type: Types.ObjectId,
			required: true,
			validate: {
				validator: CreateObjectValidator<IComponent, IComponent>(Component),
				message: 'Component could not be found!',
			},
		},
	],
	detail: { type: 'string', required: false, maxlength: 50 },
})

// Mongoose Methods //////////////////////////////////////////

/**
 * @description Assign the recipe the current time
 */
recipe.pre('save', async function (): Promise<void> {
	this.authored = new Date(Date.now())
})

// Models ////////////////////////////////////////////////////

export const Recipe: Model<IRecipe> = model<IRecipe>('Recipe', recipe)
