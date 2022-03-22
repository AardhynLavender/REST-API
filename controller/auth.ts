/**
 * @name 		Authentication
 * @author 		Aardhyn Lavender
 *
 * @description Controls the 'User' MongoDB collection, providing
 * 				basic GET, POST, PUT, and DELETE request operations as
 * 				well as routes to sort, paginate, and filter ingredients
 * 				in the database.
 */

import { User, IUser, IUserModel } from '../models/user'
import { Request, Response } from 'express'
import { AttachCookies } from '../utils/jwt'
import { CreateTokenUser, IToken } from '../utils/getTokenUserData'

export interface ICredentials {
	username?: string
	email: string
	password: string
}

export const Register = async (req: Request, res: Response): Promise<any> => {
	try {
		// register the new user
		const user: IUser = await User.create(req.body)

		// create a token
		const token: IToken = CreateTokenUser(user)
		AttachCookies(res, token)

		// update last logged in time
		user.HasLoggedIn()

		// return the authenticated users' data
		return res.status(201).json({
			success: true,
			data: user,
		})
	} catch (err) {
		return res.status(401).json({
			success: false,
			msg: err || 'unhandled exception; something went wrong!',
		})
	}
}

export const Login = async (req: Request, res: Response): Promise<any> => {
	try {
		const { username, email, password }: ICredentials = req.body

		// validate users email or username
		const user: IUser = await User.findOne({
			[username || email]: username || email,
		})

		if ((username || email) && password)
			if (user) {
				// validate password
				const valid: boolean = await user.ComparePassword(password)

				if (valid) {
					const token: IToken = CreateTokenUser(user)
					AttachCookies(res, token)
					console.log('worked!')
					// update last logged in time
					user.HasLoggedIn()

					// return the authenticated users' data
					return res.status(201).json({
						success: true,
						data: user,
					})
				} else throw 'Password was incorrect!'
			} else throw 'User could not be found!'
		else throw 'Invalid credentials!'
	} catch (err) {
		return res.status(401).json({
			success: false,
			msg: err || 'unhandled exception; something went wrong!',
		})
	}
}

export const Logout = async (req: Request, res: Response): Promise<any> => {
	const EMPTY: string = ''
	const SECOND: number = 1000
	const expiry: Date = new Date(Date.now() + SECOND)

	// revoke token
	res.cookie('token', EMPTY, {
		httpOnly: true,
		expires: expiry,
	})

	res.status(200).json({
		success: true,
		msg: 'Logout successfull!',
	})
}
