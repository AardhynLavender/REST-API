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
import { TRequest, CreateGenericGet } from './generic'
import { Request, Response } from 'express'

/**
 * A Request that fetches all components from the collection
 */
export const GetComponents: TRequest = CreateGenericGet<IComponent>(
	Component,
	'components',
	Object.keys(components[0]) || []
)

/**
 * Create a new component
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - the updated collection
 */
export const CreateComponent = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const component: IComponent = req.body

		// check if ingredient is not null|undefined
		if (component) {
			// create ingredient and return updated collection
			await Component.create(component)
			const components: Array<IComponent> = await Component.find({})

			return res.status(201).send({ success: true, data: components })
		} else
			return res
				.status(201)
				.json({ success: false, message: 'Please provide a component' })
	} catch (err) {
		return res.status(409).json({
			success: false,
			message: err || 'Failed to create an component',
		})
	}
}

/**
 * Updates the component of the given **_id** with the provided component in the body
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const UpdateComponent = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params
	const component: IComponent = req.body

	try {
		if (component) {
			// update the component
			const found = await Component.findByIdAndUpdate(id, component, {
				runValidators: true,
			})

			if (found) {
				const mutated: Array<IComponent> = await Component.find({})
				return res.status(200).json({ success: true, data: mutated })
			} else
				return res.status(400).json({
					success: false,
					message: `An id of
                            ${id}
                            yields no component and cannot be mutated`,
				})
		} else
			return res.status(404).json({
				success: 0,
				message: 'Request body contains no component!',
			})
	} catch (err) {
		return res.status(404).json({
			success: false,
			message: err || 'Failed to update!',
		})
	}
}

/**
 * Deletes the component with the provided **_id** should it exist
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const DeleteComponent = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { id } = req.params

	try {
		const component: IComponent = await Component.findByIdAndRemove(id)

		if (component) {
			const mutated: Array<IComponent> = await Component.find({})
			return res.status(200).json({ success: true, data: mutated })
		} else
			return res.status(404).json({
				success: false,
				message: `An id of ${id} yields no component and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(404)
			.json({ success: false, message: err || 'Failed to delete component!' })
	}
}
