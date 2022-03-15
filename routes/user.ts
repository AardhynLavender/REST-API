import { Router } from 'express'
const router = Router()

import {
	GetUsers,
	CreateUser,
	UpdateUser,
	DeleteUser,
} from '../controller/user'

router.route('/').get(GetUsers)
router.route('/').post(CreateUser)

router.route('/:id').put(UpdateUser)
router.route('/:id').delete(DeleteUser)

export default router
