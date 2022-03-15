import { Schema, Model, model } from 'mongoose'

/**
 * Defines a name of any arbitrary person
 */
export interface IName {
	first: string
	last: string
	middleNames?: Array<string>
}

/**
 * Defines a user of the API
 */
export interface IUser {
	name: IName
	email: string
	username: string
	password: string
	last_logged_in: Date
}

/**
 * Defines a sub-document model of an IName type
 */
const name: Schema<IName> = new Schema<IName>({
	first: { type: String, required: true, maxlength: 20 },
	last: { type: String, required: false, maxlength: 20 },
	middleNames: { type: [String], required: false, default: undefined },
})

/**
 * Defines a document model of an IUser type
 */
const user: Schema<IUser> = new Schema<IUser>({
	name: { type: name, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }, // Application can't error if a non-unique password is entered...
	last_logged_in: { type: Date, required: true, default: new Date() },
})

export const User: Model<IUser> = model('User', user)
