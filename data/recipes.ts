/**
 * @name 		RecipeSeed
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the recipe collection and for testing
 *              and development purposes.
 */

import { IRecipe } from '../models/recipe'
import { seeded_user } from './users'
import { seeded_components } from './components'

export const recipes: Array<IRecipe> = [
	{
		name: 'Baked Beans on Toast',
		author: seeded_user,
		authored: new Date(Date.now()),
		components: [seeded_components.toastBread, seeded_components.heatBeans],
		details: 'straightforward meal',
	},
]
