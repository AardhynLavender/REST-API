import { Schema, Model, model, ObjectId } from 'mongoose'
import bcrypt from 'bcrypt'

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
	_id: ObjectId
	name: IName
	email: string
	username?: string
	password: string
	last_logged_in: Date

	ComparePassword(password: string): Promise<boolean>
	HasLoggedIn(): void
}

/**
 * Defines the methods for a model of IUser
 */
export interface IUserModel {}

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

/**
 * Hash the provided password
 */
user.pre('save', async function () {
	const ROUNDS = 10
	const salt = await bcrypt.genSalt(ROUNDS)
	this.password = await bcrypt.hash(this.password, salt)
})

/**
 * Checks if the provided password matches the stored password
 * @param password un-encrypted password to compare
 * @returns Promises to compare the hashed passwords
 */
user.methods.ComparePassword = function (password: string): Promise<boolean> {
	return bcrypt.compare(password, this.password)
}

/**
 * Called when a successful authentication has occurred
 * @returns void
 */
user.methods.HasLoggedIn = function (): void {
	this.last_logged_in = new Date()
}

export const User: Model<IUser> = model<IUser>('User', user)
