/**
 * @name 		JWS
 * @author 		Aardhyn Lavender
 *
 * @description	Creation and validation for JWS tokens plus
 * 				signed cookie embedding
 */

import jwt from 'jsonwebtoken'
import { Response } from 'express'
import { ITokenUser } from './getTokenUserData'

// try to fetch env variables
const SECRET: jwt.Secret = process.env.JWT_SECRET
const LIFETIME: string = process.env.JWT_LIFETIME

// Assert presence of environment variables
if (!SECRET) throw 'SECRET could not be found!'
if (!LIFETIME) throw 'LIFETIME could not be found!'

/**
 * Validates the provided `token`
 * @param token token to validate
 * @returns the validated and parsed token in a `JwtPayload`
 */
export const IsTokenValid = (token: string): string | jwt.JwtPayload =>
	jwt.verify(token, SECRET)

/**
 *
 * @param payload A `string` or `object` to create a token from
 * @returns a `string` `token` signed with the `SECRET`
 */
const CreateToken = (payload: string | object): string =>
	jwt.sign(payload, SECRET, {
		expiresIn: LIFETIME,
	})

/**
 * Attaches the signed `IToken` to an `httponly` cookie
 * @param response To attach the `token` to
 * @param user a `IUserToken` to be cryptographically signed
 */
export const AttachCookies = (response: Response, user: ITokenUser): void => {
	const NAME: string = 'token'
	const DAY: number = 1000 * 60 * 60 * 24

	// compute cookie configuration
	const token: string = CreateToken(user)
	const isProduction: boolean = process.env.NODE_ENV === 'production'
	const expiry: Date = new Date(Date.now() + DAY)

	// attach cookie
	response.cookie(NAME, token, {
		httpOnly: true,
		expires: expiry,
		secure: isProduction,
		signed: true,
	})
}
