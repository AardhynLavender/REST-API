/**
 * @name 		UserSeed
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the user collection and for testing
 *              and development purposes.
 */

import { IUser } from './../models/user'
import { Types } from 'mongoose'

export const seeded_user: Types.ObjectId = new Types.ObjectId()

export const users: Array<IUser> = [
	{
		_id: seeded_user,
		name: {
			first: 'super',
			last: 'user',
		},
		email: 'clientname@domain.com',
		username: 'seeded_user',
		password: 'justin bailey',
	},
]
