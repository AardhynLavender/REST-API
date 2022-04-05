/**
 * @name 		Recipe
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Recipe' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter recipes
 * 				in the database.
 */

import { Recipe, IRecipe } from '../models/recipe'
import { recipes } from '../data/recipes'
import {
	TRequest,
	CreateGenericGet,
	CreateGenericPost,
	CreateGenericPut,
	CreateGenericDelete,
} from './generic'

const collection = 'components'
const object = 'component'

/**
 * A Request that fetches all recipes from the collection
 */
export const GetRecipes: TRequest = CreateGenericGet<IRecipe>(
	Recipe,
	collection,
	Object.keys(recipes[0]) || []
)

// A request that creates a new recipe for the collection
export const CreateRecipe: TRequest = CreateGenericPost<IRecipe>(Recipe, object)

// A request that updates a recipe in the collection
export const UpdateRecipe: TRequest = CreateGenericPut<IRecipe>(Recipe, object)

// A request that deletes a specified recipe from the collection
export const DeleteRecipe: TRequest = CreateGenericDelete<IRecipe>(
	Recipe,
	object
)
