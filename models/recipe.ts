/**
 * @name 		Recipe
 * @author 		Aardhyn Lavender
 *
 * @description Define schema and model interfaces and Mongoose types
 */

import { verify } from 'jsonwebtoken'
import { Types, Schema, Model, model, ObjectId } from 'mongoose'
import { Component } from './component'

// Interfaces ////////////////////////////////////////////////

/**
 * Defines a collection of components into a recipe
 */
export interface IRecipe {
	_id: ObjectId
	name: string
	author: ObjectId
	authored: Date
	components: Array<ObjectId>
	details?: string
}

// Validation ////////////////////////////////////////////////

/**
 * verify user exits
 * @param user user to validate
 * @returns if the user is valid
 */
const mValidateUser = (user: ObjectId): boolean => {
	return true
}

/**
 * validate the length of the components array
 * @param Components to validate
 * @returns if there are at least one component
 */
const mValidateLength = (Components: Array<ObjectId>): boolean =>
	!!Components.length

/**
 * ensure components are actually valid
 * @param components to validate
 * @returns if all components are valid
 */
const mValidateComponents = (components: Array<ObjectId>): boolean => {
	return true
}

// Schemas ///////////////////////////////////////////////////

const recipe: Schema<IRecipe> = new Schema<IRecipe>({
	name: { type: String, unique: true, required: true, maxlength: 20 },
	author: {
		ref: 'User',
		type: Types.ObjectId,
		required: true,
		validate: { validator: mValidateUser, message: 'Could not find author!' },
	},
	authored: { type: Date, required: false },
	components: {
		ref: 'Component',
		type: [Types.ObjectId],
		required: true,
		validate: [
			{
				validator: mValidateLength,
				message: 'recipe must contain at least one component!',
			},
			{
				validator: mValidateComponents,
				message: 'Invalid Components!',
			},
		],
	},
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
