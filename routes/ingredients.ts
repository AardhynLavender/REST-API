/**
 * @name 		Component
 * @author 		Aardhyn Lavender
 *
 * @description Provide endpoint and protocols for the Ingredient collection
 */

import { Router } from 'express'
const router = Router()

import {
	GetIngredients,
	CreateIngredient,
	UpdateIngredient,
	DeleteIngredient,
} from '../controller/ingredients'

router.route('/').get(GetIngredients)
router.route('/').post(CreateIngredient)

router.route('/:id').put(UpdateIngredient)
router.route('/:id').delete(DeleteIngredient)

export default router
