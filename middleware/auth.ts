/**
 * @name 		Authentication
 * @author 		Aardhyn Lavender
 *
 * @description Validates correct authentication has been provided
 * 				for routes employing this middleware.
 */

import jwt from 'jsonwebtoken'
import { IsTokenValid } from '../utils/jwt'
import { Request, Response } from 'express'

/**
 * validates authentication state before processing route
 * @param req request of the API
 * @param res response for the caller
 * @param next route to call given valid authentication
 * @returns a promise of something -- the signature of the `next` could be `any`
 */
export const authenticatedRoute = async (
	req: Request,
	res: Response,
	next: any // next() could be `any` method
): Promise<any> => {
	try {
		const token = req.signedCookies.token

		if (token) {
			const payload: string | jwt.JwtPayload = IsTokenValid(token)

			// narrow type to jwtPayload
			if (typeof payload !== 'string') {
				req.body.user = payload.user

				next() // proceed with `next` request
			} else throw 'Could not Validate Token'
		} else throw 'Unauthorized Access!'
	} catch (err) {
		return res.status(401).json({
			success: false,
			message: err || 'Invalid Authentication!',
		})
	}
}
