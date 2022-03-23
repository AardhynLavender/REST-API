/**
 * @name 		Component
 * @author 		Aardhyn Lavender
 *
 * @description Define schema and model interfaces and Mongoose types
 */

import { Types, Schema, Model, model, ObjectId } from 'mongoose'
import { IIngredient } from './ingredient'
import { IUser } from './user'

// Interfaces ///////////////////////////////

/**
 * @description Contextualizes an Ingredient with a method and amount
 * @example { 'egg', 'boil in water for 5 minutes', 'egg * serving amount' }
 */
export interface ICondiment {
	ingredient: ObjectId
	method?: string
	amount?: string
}

/**
 * @description Defines a discrete component in a recipe
 * @example boil egg, cook rice, etc.
 */
export interface IComponent {
	_id: ObjectId
	name: string

	// who created this?
	author: IUser
	authored: Date

	// required condiments and utensils to create this component
	condiments: Array<ICondiment>
	utensils: Array<ObjectId>

	// what to do and how long?
	method?: string
	duration: number

	// what do I have when I'm done?
	results: Array<IIngredient>
}

// Validation //////////////////////////////////

/**
 * verify an array of condiments was provided.
 * @param condiments condiments to verify
 * @returns array is valid
 */
const mValidateCondiments = (condiments: Array<ICondiment>): boolean =>
	Array.isArray(condiments) &&
	!!condiments.length /* also verify each condiment _id and unique set */

/**
 * verify an array of utensils was provided.
 * @param utensils utensils to verify
 * @returns
 */
const mValidateUtensils = async (utensils: Array<ObjectId>): Promise<boolean> =>
	Array.isArray(utensils) &&
	!!utensils.length /* also verify each utensil _id and unique set */

const mValidateDuration = (duration: Number): boolean => duration > 0

// Schemas ///////////////////////////////////////

/**
 * Defines a condiment sub-document
 */
const condiment: Schema<ICondiment> = new Schema<ICondiment>({
	ingredient: { ref: 'Ingredient', type: Types.ObjectId, required: true },
	method: { type: String, required: false, maxlength: 50 },
	amount: { type: String, required: false, maxlength: 20 },
})

/**
 * Defines a component to be stored in a MongoDB Collection
 */
const component: Schema<IComponent> = new Schema<IComponent>({
	name: { type: String, required: true, unique: true, maxlength: 20 },
	author: { ref: 'User', type: Types.ObjectId, required: true },
	authored: { type: Date, required: false },
	condiments: {
		type: [condiment],
		validate: {
			validator: mValidateCondiments,
			message: 'Invalid condiments!',
		},
	},
	utensils: [
		{
			ref: 'Utensil',
			type: Types.ObjectId,
			validate: mValidateUtensils,
			required: false,
		},
	],
	method: { type: String, required: true, maxlength: 100 },
	duration: { type: Number, required: true, mValidateDuration },
	results: [{ ref: 'Ingredient', type: Types.ObjectId }],
})

// Mongoose Methods ////////////////////////////////

/**
 * @description Assign the component the current time
 */
component.pre('save', async function (): Promise<void> {
	this.authored = new Date(Date.now())
})

// Models //////////////////////////////////////////

export const Component: Model<IComponent> = model('Component', component)
