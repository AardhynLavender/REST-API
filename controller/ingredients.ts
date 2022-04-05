/**
 * @name 		Ingredient
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Ingredients' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { Ingredient, IIngredient } from '../models/ingredient'
import { ingredients } from '../data/ingredients'
import {
	TRequest,
	CreateGenericGet,
	CreateGenericPost,
	CreateGenericPut,
	CreateGenericDelete,
} from './generic'

const collection = 'ingredients'
const object = 'ingredient'

// A request that fetches all ingredients from the collection
export const GetIngredients: TRequest = CreateGenericGet<IIngredient>(
	Ingredient,
	collection,
	Object.keys(ingredients[0]) || []
)

// A request that creates a new ingredient for the collection
export const CreateIngredient: TRequest = CreateGenericPost<IIngredient>(
	Ingredient,
	object
)

// A request that updates an ingredient in the collection
export const UpdateIngredient: TRequest = CreateGenericPut<IIngredient>(
	Ingredient,
	object
)

// A request that deletes a specified ingredient from the collection
export const DeleteIngredient: TRequest = CreateGenericDelete<IIngredient>(
	Ingredient,
	object
)
