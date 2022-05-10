/**
 * @name 		App
 * @author 		aardhyn lavender
 *
 * @description root level configuration and application
 * 				entry point.
 */

// Environment Variables ///////////////////////////

import dotenv from 'dotenv'
dotenv.config()

const PORT: string = process.env.PORT || '4000'
const MONGO: string = process.env.MONGO_URI
const SECRET: string = process.env.JWT_SECRET

// Configure Express ///////////////////////////////

import express from 'express'
export const application = express()

application.use(express.urlencoded({ extended: false }))
application.use(express.json())

// Security ////////////////////////////////////////

import helmet from 'helmet'
application.use(helmet())

import cors from 'cors'
application.use(
	cors({
		origin: '*', // Public API
	})
)
application.use(
	cors({
		credentials: true,
	})
)

// Traffic /////////////////////////////////////////

const REQUESTS_PM: number = 25
const WINDOW_MS: number = 1000 * 60 // 1 minute

import rateLimit from 'express-rate-limit'
const limit: any = rateLimit({
	windowMs: WINDOW_MS,
	max: REQUESTS_PM,
})

application.use(limit)

// MongoDB connection //////////////////////////////

import { connection } from './db/connection'

// Authentication //////////////////////////////////

import { authenticatedRoute } from './middleware/auth'
import cookieParser from 'cookie-parser'

application.use(cookieParser(SECRET))
application.use(`api/`, authenticatedRoute)

// Import routes ///////////////////////////////////

const VERSION: number = 1
const prefix: string = `/api/v${VERSION}`

import ingredients from './routes/ingredients'
application.use(
	`/api/v${VERSION}/ingredients/`,
	authenticatedRoute,
	ingredients
)

import utensil from './routes/utensil'
application.use(`${prefix}/utensils`, authenticatedRoute, utensil)

import component from './routes/component'
application.use(`${prefix}/components`, authenticatedRoute, component)

import recipe from './routes/recipe'
application.use(`${prefix}/recipes`, authenticatedRoute, recipe)

// Intentionally unauthenticated
import auth from './routes/auth'
application.use('/', auth)

// all unmapped routes go to void
import voidRoute from './routes/void'
application.use('/', voidRoute)

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
