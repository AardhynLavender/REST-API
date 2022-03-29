/**
 * @name 		DatabaseConnection
 * @author 		Aardhyn Lavender
 *
 * @description Connects to a MongoDB Database with the provided
 * 				configuration and connection url
 */

import mongoose from 'mongoose'

const options: any = {
	useNewUrlParser: true,
	autoIndex: true,
	keepAlive: true,
	connectTimeoutMS: 10000,
	socketTimeoutMS: 45000,
	family: 4,
	useUnifiedTopology: true,
}

export const connection = (url: string) => mongoose.connect(url, options)
