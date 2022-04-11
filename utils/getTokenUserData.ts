/**
 * @name 		GetTokenUserData
 * @author 		Aardhyn Lavender
 *
 * @description	Create authenticated token based on user
 * 			    data for signed cookies
 */

import { IUser } from '../models/user'

export interface ITokenUser {
	name: string
	id: string
}

export const CreateTokenUser = (user: IUser): ITokenUser => ({
	name: user.username,
	id: user._id.toString(),
})
