/**
 * @name 		Utensil
 * @author 		aardhyn lavender
 *
 * @description provide endpoint and protocols for the recipe collection
 */

import { Router } from 'express'
const router = Router()

import {
	GetUtensils,
	CreateUtensil,
	UpdateUtensil,
	DeleteUtensil,
} from '../controller/utensil'

router.route('/').get(GetUtensils)
router.route('/').post(CreateUtensil)

router.route('/:id').put(UpdateUtensil)
router.route('/:id').delete(DeleteUtensil)

export default router
