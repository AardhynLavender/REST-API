/**
 * @name 		Authentication
 * @author 		Aardhyn Lavender
 *
 * @description Provides endpoints to register, login, and logout a given user
 */

import { User, IUser } from '../models/user'
import { Request, Response } from 'express'
import { AttachCookies } from '../utils/jwt'
import { CreateTokenUser, ITokenUser } from '../utils/getTokenUserData'

/**
 * Defines the necessary credentials in order to authenticate a user
 */
export interface ICredentials {
	username?: string
	email: string
	password: string
}

/**
 * Registers a new user and authorizes routes for them
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns The state of the request -- successful or not
 */
export const Register = async (req: Request, res: Response): Promise<any> => {
	try {
		// register the new user
		const user: IUser = await User.create(req.body)

		// create a token
		const token: ITokenUser = CreateTokenUser(user)
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

/**
 * Attempts to authenticate routes for a user based on the provided credentials
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns Returns a tasty cookie if the users been good
 */
export const Login = async (req: Request, res: Response): Promise<any> => {
	try {
		const { username, email, password }: ICredentials = req.body

		// validate users email or username
		const user: IUser | undefined = await User.findOne({
			[username || email]: username || email,
		})

		if ((username || email) && password)
			if (user) {
				// validate password
				const valid: boolean = await user.ComparePassword(password)

				if (valid) {
					const token: ITokenUser = CreateTokenUser(user)
					AttachCookies(res, token)

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

/**
 * Unauthenticated all routes by revoking the signed cookie token
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns The state of the request -- successful or not
 */
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
		msg: 'Logout successful!',
	})
}
