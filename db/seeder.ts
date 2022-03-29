/**
 * @name 		Seeder
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the specified collection and dependencies
 * 				for testing and development purposes.
 */

import dotenv from 'dotenv'

import { Model } from 'mongoose'

import { Ingredient, IIngredient } from '../models/ingredient'
import { connection } from './connection'

import { ingredients } from '../data/ingredients'
import { utensils } from '../data/utensils'
import { components } from '../data/components'
import { recipes } from '../data/recipes'
import { users } from '../data/users'

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

		// create documents individually to ensure any save methods and validation are called.
		for (const object of data) await collection.create(object)
	} catch (err) {
		console.log(err || 'Collection seeding failed!')
		process.exit(1)
	} finally {
		console.log('Collection seeding successful!')
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
	}
}
/**
 * Seed components and dependencies
 */
const SeedComponents = async (): Promise<void> => {
	await SeedCollection<IUtensil, IUtensil>(Utensil, utensils)
	await SeedCollection<IIngredient, IIngredient>(Ingredient, ingredients)
	await SeedCollection<IUser, IUser>(User, users)
	await SeedCollection<IComponent, IComponent>(Component, components)
}

/**
 * Entry point
 * @param argv command line argument variables
 */
const Main = async (argv: Array<string>): Promise<void> => {
	const COLLECTION: number = 2
	const DELETE: number = 3

	// determine parameters
	const deleteFlag: boolean = argv[DELETE] === '-d'
	const collectionName: string | undefined = argv[COLLECTION]

	// determine the collection to seed
	if (collectionName) {
		switch (collectionName.toLowerCase()) {
			case 'ingredients':
				if (deleteFlag) await PurgeCollection<IIngredient>(Ingredient)
				else
					await SeedCollection<IIngredient, IIngredient>(
						Ingredient,
						ingredients
					)
				process.exit(0)

			case 'utensils':
				if (deleteFlag) await PurgeCollection<IUtensil>(Utensil)
				else await SeedCollection<IUtensil, IUtensil>(Utensil, utensils)
				process.exit(0)

			case 'components':
				if (deleteFlag) await PurgeCollection<IComponent>(Component)
				else await SeedComponents()
				process.exit(0)

			case 'recipes':
				if (deleteFlag) await PurgeCollection<IRecipe>(Recipe)
				else {
					// must seed components first...
					await SeedComponents()
					await SeedCollection<IRecipe, IRecipe>(Recipe, recipes)
				}
				process.exit(0)

			case 'users':
				if (deleteFlag) await PurgeCollection<IUser>(User)
				else await SeedCollection<IUser, IUser>(User, users)
				process.exit(0)

			default:
				throw `'${collectionName}' collection could not be found!`
		}
	} else throw 'Collection to seed must be specified!'
}

Main(process.argv)
