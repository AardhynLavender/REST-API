/**
 * @name 		User
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'User' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { User, IUser } from '../models/user'
import { Request, Response } from 'express'

/**
 * Determines whether an email address is likely valid
 * @param { IUser } user the user whose email needs validation
 * @returns is the email valid
 */
const mValidateEmail = (user: IUser): boolean => user.email.includes('@')

/**
 * Gets **all** users from the database
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns all users of the API
 */
export const GetUsers = async (req: Request, res: Response): Promise<any> => {
	try {
		const users: Array<IUser> = await User.find({})
		return res.status(200).json({ success: 1, data: users })
	} catch (err) {
		return res.status(500).json({
			message: err.message || 'users could not be fetched',
		})
	}
}

/**
 * Create a new **unique** user
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - the updated collection
 */
export const CreateUser = async (req: Request, res: Response): Promise<any> => {
	try {
		const user: IUser = req.body

		// check if ingredient is not null|undefined
		if (user) {
			// assert email validity
			if (!mValidateEmail(user)) throw 'Invalid email'

			// create user and return updated collection
			await User.create(user)
			const users: Array<IUser> = await User.find({})

			return res.status(201).send({ success: true, data: users })
		} else
			return res
				.status(201)
				.json({ success: false, message: 'Please provide a name' })
	} catch (err) {
		return res.status(409).json({
			success: false,
			message: err || 'Failed to create an ingredient',
		})
	}
}

/**
 * Updates a user of the given **_id** with the provided information in the body
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const UpdateUser = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params
	const user: IUser = req.body

	try {
		if (user) {
			if (!mValidateEmail(user)) throw 'Mutation causes an invalid email'
			const found = await User.findByIdAndUpdate(id, user)

			if (found) {
				const mutated: Array<IUser> = await User.find({})
				return res.status(200).json({ success: true, data: mutated })
			} else
				return res.status(400).json({
					success: false,
					message: `An id of
							${id}
							yields no user and cannot be mutated`,
				})
		} else
			return res.status(403).json({
				success: 0,
				message: 'Request body contains no User!',
			})
	} catch (err) {
		return res.status(403).json({
			success: false,
			message: err || 'Failed to update!',
		})
	}
}

/**
 * Deletes the user with the provided **_id** should it exist
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns if successful - The updated collection
 */
export const DeleteUser = async (req: Request, res: Response): Promise<any> => {
	const { id } = req.params

	try {
		const user: IUser = await User.findByIdAndRemove(id)

		if (user) {
			const mutated: Array<IUser> = await User.find({})
			return res.status(200).json({ success: true, data: mutated })
		} else
			return res.status(404).json({
				success: false,
				message: `An id of ${id} yields no user and cannot be deleted`,
			})
	} catch (err) {
		return res
			.status(404)
			.json({ success: false, message: err || 'Failed to delete user!' })
	}
}
