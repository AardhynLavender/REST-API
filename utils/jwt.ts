import jwt from 'jsonwebtoken'
import { CookieOptions, Response } from 'express'
import { IToken } from './getTokenUserData'

// try to fetch env variables
const SECRET: jwt.Secret = process.env.JWT_SECRET
const LIFETIME: string = process.env.JWT_LIFETIME

if (!SECRET) throw 'SECRET could not be found!'
if (!LIFETIME) throw 'LIFETIME could not be found!'

export const IsTokenValid = ({ token }): string | jwt.JwtPayload =>
	jwt.verify(token, SECRET)

const CreateToken = (payload: string | object): string =>
	jwt.sign(payload, SECRET, {
		expiresIn: LIFETIME,
	})

export const AttachCookies = (response: Response, user: IToken): void => {
	const NAME: string = 'token'
	const DAY: number = 1000 * 60 * 60 * 24

	const token: string = CreateToken(user)
	const isProduction: boolean = process.env.NODE_ENV === 'production'
	const expiry: Date = new Date(Date.now() + DAY)

	response.cookie(NAME, token, {
		httpOnly: true,
		expires: expiry,
		secure: isProduction,
		signed: true, // Works when this is false
	})
	console.log('cookie attached!')
}
