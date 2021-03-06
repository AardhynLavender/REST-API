/**
 * @name 		User
 * @author 		Aardhyn Lavender
 *
 * @description Define schema and model interfaces and Mongoose types
 */

import { Schema, Model, model, Types, ObjectId } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Interfaces //////////////////////////////////////////////

/**
 * Defines a name of any arbitrary person
 */
export interface IName {
	first: string
	last: string
	middleNames?: Array<string>
}

export interface ITokenUser {
	name: string
	id: string
}

/**
 * Defines a user of the API
 */
export interface IUser {
	_id?: Types.ObjectId
	name: IName
	email: string
	username?: string
	password: string
	last_logged_in?: Date

	ComparePassword?(password: string): Promise<boolean>
	HasLoggedIn?(): void
	CreateJWT?(): string | object
}

// Schema ////////////////////////////////////////////

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

// Mongoose Methods ////////////////////////////////////////

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

user.methods.CreateJWT = function (): string | object {
	return jwt.sign(
		{
			id: this._id,
			name: this.name,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	)
}

// Models ////////////////////////////////////////////////

export const User: Model<IUser> = model<IUser>('User', user)
