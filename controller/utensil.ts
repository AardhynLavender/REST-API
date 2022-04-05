/**
 * @name 		Utensil
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Utensils' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { Utensil, IUtensil } from '../models/utensil'
import { utensils } from '../data/utensils'
import {
	TRequest,
	CreateGenericGet,
	CreateGenericPost,
	CreateGenericPut,
	CreateGenericDelete,
} from './generic'

const collection = 'utensil'
const object = 'utensil'

/**
 * A Request that fetches all utensils from the collection
 */
export const GetUtensils: TRequest = CreateGenericGet<IUtensil>(
	Utensil,
	collection,
	Object.keys(utensils[0]) || []
)

// A request that creates a new utensil for the collection
export const CreateUtensil: TRequest = CreateGenericPost<IUtensil>(
	Utensil,
	object
)

// A request that updates a utensil in the collection
export const UpdateUtensil: TRequest = CreateGenericPut<IUtensil>(
	Utensil,
	object
)

// A request that deletes a specified utensil from the collection
export const DeleteUtensil: TRequest = CreateGenericDelete<IUtensil>(
	Utensil,
	object
)
