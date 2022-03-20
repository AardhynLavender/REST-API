import { Schema, Model, model } from 'mongoose'
import { IUser } from './user'

/**
 * An object that must implement strings as keys for strings
 * ie :: a string enumerator
 */
interface IStringEnum {
	[id: string]: string
}

/**
 * Defines materials for a utensil
 */
export enum Material {
	WOOD = 'WOOD',
	ALUMINUM = 'ALUMINUM',
	STONE = 'STONE',
	CAST_IRON = 'CAST_IRON',
	STEEL = 'STEEL',
	PLASTIC = 'PLASTIC',
}

/**
 * Defines size catagories for a utensil
 */
export enum Size {
	TINY = 'TINY',
	SMALL = 'SMALL',
	MEDIUM = 'MEDIUM',
	LARGE = 'LARGE',
	HUGE = 'HUGE',
	RIDICULOUS = 'RIDICULOUS',

	// Indicates a specified volume
	// Will enforce and optionality of 1 for IUtensil measurement
	MEASURED = 'MEASURED',
}

/**
 * Creates a string of values from an enumerator
 * @param enumerator the enumerator to parse
 * @returns values as a string array
 */
const mGetValues = (enumerator: IStringEnum): Array<string> =>
	Object.values(enumerator).map((value: string) => value.toLowerCase())

/**
 * Defines a utensil used in a recipes component
 */
export interface IUtensil {
	name: string
	material: Material
	size: Size
	measurement?: string
	description?: string
	owning?: Array<IUser>
}

/**
 * Defines a document model of an IUtensil type
 */
const utensil: Schema<IUtensil> = new Schema<IUtensil>({
	name: { type: String, required: true, maxlength: 20 },
	material: {
		type: String,
		enum: mGetValues(Material),
		required: true,
	},
	size: {
		type: String,
		enum: mGetValues(Size),
		required: true,
	},
	measurement: {
		type: String,
		required: false,
		maxlength: 20,
		default: 'variable',
		trim: true,
	},
	description: { type: String, required: false, maxlength: 60 },
	owning: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

// name-material-size-measurement composite key
utensil.index(
	{ name: 1, material: 1, size: 1, measurement: 1 },
	{ unique: true }
)

export const Utensil: Model<IUtensil> = model('Utensil', utensil)
