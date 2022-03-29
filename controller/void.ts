/**
 * @name 		Void
 * @author 		Aardhyn Lavender
 *
 * @description Provides an standard response for unmapped|void
 *              endpoints.
 */

import { Request, Response } from 'express'

/**
 * standard response for void routes
 * @param { Request } req request of the server
 * @param { Response } res response from the server
 * @returns standard error message
 */
export const VoidRoute = async (req: Request, res: Response): Promise<any> => {
	res.status(204).json({ success: false, message: 'Endpoint not found!' })
}
