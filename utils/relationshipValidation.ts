/**
 * @name 		RelationshipValidation
 * @author 		Aardhyn Lavender
 *
 * @description Validates whether a relationship exists between an
 *              `ObjectID` and a `Collection`.
 */

import { ObjectId, Model } from 'mongoose'

/**
 * Defines a Function that validates if an object exists in a collection
 */
type ObjectValidator = (object: ObjectId) => Promise<boolean>

/**
 * Creates a function that validates a relationship exists between a generic `collection` and a generic `object`
 * @param object object to validate in `collection`
 * @param collection collection to validate `object` in
 * @returns an `ObjectValidator`
 */
export const CreateObjectValidator = <TCollection, TObject>(
	collection: Model<TCollection>
): ObjectValidator => {
	return async function (object: ObjectId) {
		const found: TObject = await collection.findById(object)
		return !!found
	}
}
