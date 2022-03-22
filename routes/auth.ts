import { Router } from 'express'
const router = Router()

import { Register, Login, Logout } from '../controller/auth'

router.route('/register').get(Register)
router.route('/login').get(Login)
router.route('/logout').get(Logout)

export default router
