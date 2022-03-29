/**
 * @name 		UtensilSeed
 * @author 		Aardhyn Lavender
 *
 * @description Seeds the utensil collection and for testing
 *              and development purposes.
 */

import { Material, Size, IUtensil } from '../models/utensil'
import { Types } from 'mongoose'

export const seeded_utensils: Record<string, Types.ObjectId> = {
	spoon: new Types.ObjectId(),
	toaster: new Types.ObjectId(),
	pot: new Types.ObjectId(),
}

export const utensils: Array<IUtensil> = [
	{
		_id: seeded_utensils.spoon,
		name: 'Spoon',
		material: Material.WOOD,
		size: Size.MEDIUM,
		measurement: 'various',
		description: 'long handled wooden spoon for stirring',
	},
	{
		_id: seeded_utensils.toaster,
		name: 'toaster',
		material: Material.ELECTRONIC,
		size: Size.MEASURED,
		measurement: '4 slices',
		description: 'toasts 4 slices of bread asynchronously',
	},
	{
		_id: seeded_utensils.pot,
		name: 'pot',
		material: Material.ALUMINUM,
		size: Size.LARGE,
		description: 'large pot for cooking things over an element',
	},
]
