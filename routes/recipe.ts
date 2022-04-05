/**
 * @name 		Recipe
 * @author 		aardhyn lavender
 *
 * @description provide endpoint and protocols for the recipe collection
 */

import { Router } from 'express'
const router = Router()

import {
	GetRecipes,
	CreateRecipe,
	UpdateRecipe,
	DeleteRecipe,
} from '../controller/recipe'

router.route('/').get(GetRecipes)
router.route('/:id').get(GetRecipes)
router.route('/').post(CreateRecipe)

router.route('/:id').put(UpdateRecipe)
router.route('/:id').delete(DeleteRecipe)

export default router
