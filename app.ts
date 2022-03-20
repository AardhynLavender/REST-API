// Access Environment Variables ///////////////////

import dotenv from 'dotenv'
dotenv.config()

const PORT: string = process.env.PORT || '4000'
const MONGO: string = process.env.MONGO_URI

// Configure Express //////////////////////////////

import express from 'express'
export const application = express()

application.use(express.urlencoded({ extended: false }))
application.use(express.json())

// MongoDB connection //////////////////////////////

import { connection } from './connection'

// Import routes ///////////////////////////////////

import ingredients from './routes/ingredients'
application.use('/api/v1/ingredients', ingredients)

import users from './routes/user'
application.use('/api/v1/users/', users)

import utensil from './routes/utensil'
application.use('/api/v1/utensils/', utensil)

// Initialize Application //////////////////////////

const ListenReporter = (): void => console.log('listening on ' + PORT + '!')

const Main = async () => {
	try {
		// attempt to connect to the database
		await connection(MONGO)

		// listen for requests
		application.listen(PORT, ListenReporter)
	} catch (err) {
		console.log(err || 'Failed to initialize application')
	}
}

if (PORT && MONGO) Main()
else
	throw '[App.ts] Could not parse environment variables -- is a .ENV file present?'
