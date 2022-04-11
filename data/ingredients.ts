/**
 * @name 		IngredientSeed
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the ingredient collection and for testing
 *              and development purposes.
 */

import { IIngredient } from '../models/ingredient'
import { Types } from 'mongoose'

/**
 * Generate known unique id
 */
export const seeded_ingredients: Record<string, Types.ObjectId> = {
	bakedBeans: new Types.ObjectId(),
	bread: new Types.ObjectId(),
	toast: new Types.ObjectId(),
}

/**
 * Ingredient seeds
 */
export const ingredients: Array<IIngredient> = [
	{
		_id: seeded_ingredients.bakedBeans,
		name: 'Baked Beans',
		description: 'A can of baked beans',
		brand: 'Watties',
		type: 'can',
	},
	{
		_id: seeded_ingredients.bread,
		name: 'bread',
		description: 'a slice of bread',
		brand: 'various',
		type: 'packaged',
	},
	{
		_id: seeded_ingredients.toast,
		name: 'toast',
		description: 'toasted bread',
		type: 'singleton',
	},
]
