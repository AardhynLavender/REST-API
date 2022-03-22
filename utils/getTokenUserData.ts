import { IUser } from '../models/user'

export interface IToken {
	name: string
	id: string
}

export const CreateTokenUser = (user: IUser): IToken => ({
	name: user.username,
	id: user._id.toString(),
})
