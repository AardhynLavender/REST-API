/**
 * @name 		Authentication
 * @author 		Aardhyn Lavender
 *
 * @description Provide endpoints for authentication and the user collection
 */

import { Router } from 'express'
const router = Router()

import { Register, Login, Logout } from '../controller/auth'

router.route('/register').post(Register)
router.route('/login').get(Login)
router.route('/logout').get(Logout)

export default router
