/**
 * @name 		Void
 * @author 		aardhyn lavender
 *
 * @description provide endpoint for unmapped|void endpoint routes
 */

import { Router } from 'express'
const router = Router()

import { VoidRoute } from '../controller/void'

/**
 * Route unmapped routes to the VoidRoute
 */
router
	.route('*')
	.get(VoidRoute)
	.post(VoidRoute)
	.put(VoidRoute)
	.patch(VoidRoute)
	.delete(VoidRoute)
	.copy(VoidRoute)
	.head(VoidRoute)
	.options(VoidRoute)
	.purge(VoidRoute)
	.lock(VoidRoute)
	.unlock(VoidRoute)

export default router
