/**
 * @name 		Component
 * @author 		Aardhyn Lavender
 *
 * @description Provide endpoint and protocols for the component collection
 */

import { Router } from 'express'
const router = Router()

import {
	GetComponents,
	CreateComponent,
	UpdateComponent,
	DeleteComponent,
} from '../controller/component'

router.route('/').get(GetComponents)
router.route('/:id').get(GetComponents)
router.route('/').post(CreateComponent)

router.route('/:id').put(UpdateComponent)
router.route('/:id').delete(DeleteComponent)

export default router
