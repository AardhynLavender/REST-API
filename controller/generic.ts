/**
 * @name 		Generic
 * @author 		Aardhyn Lavender
 *
 * @description Provides templated routes for controllers
 */

import { Model } from 'mongoose'
import { Request, Response } from 'express'

/**
 * A function that accepts a `request` and provides a `response` promising `anything`
 */
export type TRequest = (req: Request, res: Response) => Promise<any>

/**
 * Generates a routes that returns all `TObject` from the `TCollection` collection
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns all `TObject` in the collection
 */
export const CreateGenericRoute =
	<TObject>(collection: Model<TObject>, objectName: string): TRequest =>
	async (req: Request, res: Response): Promise<any> => {
		try {
			const objects: Array<TObject> = await collection.find({})
			return res.status(200).json({ success: true, data: objects })
		} catch (err) {
			return res.status(500).json({
				success: false,
				message: err.message || `${objectName} could not be fetched`,
			})
		}
	}
