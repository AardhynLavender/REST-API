import dotenv from 'dotenv'

import { Model } from 'mongoose'

import { Ingredient, IIngredient } from '../models/ingredient'
import { connection } from './connection'

import ingredients from '../data/ingredients.json'

import { IComponent, Component } from '../models/component'
import { IUtensil, Utensil } from '../models/utensil'
import { IRecipe, Recipe } from '../models/recipe'
import { IUser, User } from '../models/user'

// attempt to retrieve environment variables
dotenv.config()
const MONGO: string = process.env.MONGO_URI
if (!MONGO) throw 'MONGO_URI could not be parsed!'

// connect to mongoDB
connection(MONGO)

/**
 * Seeds the specified collection with the provided data
 * @param collection collection to seed
 * @param data data to be seeded
 * @returns the success of the the operation
 */
const SeedCollection = async <TCollection, TSeed>(
	collection: Model<TCollection>,
	data: Array<TSeed>
): Promise<void> => {
	try {
		// repopulate collection with only seeded data
		await collection.deleteMany()
		await collection.insertMany(data)
	} catch (err) {
		console.log(err || 'Collection seeding failed!')
		process.exit(1)
	} finally {
		console.log('Collection seeding successful!')
		process.exit(0)
	}
}

/**
 * Removes all the elements in the specified collection
 * @param collection collection to purge
 */
const PurgeCollection = async <TCollection>(
	collection: Model<TCollection>
): Promise<void> => {
	try {
		await collection.deleteMany()
	} catch (err) {
		console.log(err || 'Collection purge failed!')
		process.exit(1)
	} finally {
		console.log('Collection purge successful!')
		process.exit(0)
	}
}

/**
 * Entry point
 * @param argv command line argument variables
 */
const main = (argv: Array<string>): void => {
	const DELETE: number = 3
	const COLLECTION: number = 2

	// determine parameters
	const deleteFlag: boolean = argv[DELETE] === '-d'
	const collectionName: string | undefined = argv[COLLECTION]

	// determine the collection to seed
	if (collectionName) {
		switch (collectionName.toLowerCase()) {
			case 'ingredients':
				if (deleteFlag) PurgeCollection<IIngredient>(Ingredient)
				else SeedCollection<IIngredient, IIngredient>(Ingredient, ingredients)
				break
			default:
				throw `'${collectionName}' collection could not be found!`
		}
	} else throw 'Collection to seed must be specified!'
}

main(process.argv)
