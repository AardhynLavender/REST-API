// Access Environment Variables ///////////////////

import dotenv from 'dotenv'
dotenv.config()

const PORT: string = process.env.PORT || '4000'
const MONGO: string = process.env.MONGO_URI
const SECRET: string = process.env.JWT_SECRET

// Configure Express //////////////////////////////

import express from 'express'
import cookieParser from 'cookie-parser'
export const application = express()

application.use(express.urlencoded({ extended: false }))
application.use(cookieParser(SECRET))
application.use(express.json())

// MongoDB connection //////////////////////////////

import { connection } from './db/connection'

// Import routes ///////////////////////////////////

import ingredients from './routes/ingredients'
application.use('/api/v1/ingredients', ingredients)

import auth from './routes/auth'
application.use('/', auth)

import utensil from './routes/utensil'
application.use('/api/v1/utensils/', utensil)

import component from './routes/component'
application.use('/api/v1/component/', component)

// Initialize Application //////////////////////////

const ListenReporter = (): void => console.log('listening on ' + PORT + '!')

const Main = async () => {
	try {
		// attempt to connect to the database
		connection(MONGO)

		// listen for requests
		application.listen(PORT, ListenReporter)
	} catch (err) {
		console.log(err || 'Failed to initialize application')
	}
}

if (PORT && MONGO && SECRET) Main()
else
	throw '[App.ts] Could not parse environment variables -- is a .ENV file present?'
