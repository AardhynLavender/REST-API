/**
 * @name 		ComponentSeed
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the component collection and for testing
 *              and development purposes.
 */

import { IComponent } from '../models/component'
import { seeded_user } from './users'
import { Types } from 'mongoose'
import { seeded_ingredients } from './ingredients'
import { seeded_utensils } from './utensils'

export const seeded_components: Record<string, Types.ObjectId> = {
	heatBeans: new Types.ObjectId(),
	toastBread: new Types.ObjectId(),
}

export const components: Array<IComponent> = [
	{
		_id: seeded_components.heatBeans,
		name: 'Heat Beans',
		author: seeded_user,
		authored: new Date(Date.now()),
		condiments: [seeded_ingredients.bakedBeans, seeded_ingredients.bakedBeans],
		utensils: [seeded_utensils.pot, seeded_utensils.spoon],
		duration: 6,
		results: [seeded_ingredients.bakedBeans], // yields baked beans
		method: 'Heat beans though in pot over a medium heat for 5 minutes',
	},
	{
		_id: seeded_components.toastBread,
		name: 'toast Bread',
		author: seeded_user,
		authored: new Date(Date.now()),
		condiments: [seeded_ingredients.bread],
		utensils: [seeded_utensils.toaster],
		duration: 5,
		results: [seeded_ingredients.toast], // yields baked beans
		method: 'toast to desired amount, then place on plate',
	},
]
