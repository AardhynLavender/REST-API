/**
 * @name 		Component
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'Components' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter components
 * 				in the database.
 */

import { Component, IComponent } from '../models/component'
import { components } from '../data/components'

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
 * A Request that fetches all components from the collection
 */
export const GetComponents: TRequest = CreateGenericGet<IComponent>(
	Component,
	collection,
	Object.keys(components[0]) || []
)

// A request that creates a new component for the collection
export const CreateComponent: TRequest = CreateGenericPost<IComponent>(
	Component,
	object
)

// A request that updates a component in the collection
export const UpdateComponent: TRequest = CreateGenericPut<IComponent>(
	Component,
	object
)

// A request that deletes a specified component from the collection
export const DeleteComponent: TRequest = CreateGenericDelete<IComponent>(
	Component,
	object
)
