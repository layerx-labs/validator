import Schema from "./schema"
import SchemaFormat from "./schema-format"
import SchemaInput from "./schema-input"

export default interface SchemaOptions {
	/**
	 * The name of the table/entity to get value to validate uniqueness
	 * 
	 */
	orm?: string
	/**
	 * Allow the property to be unique to be unique in the table
	 */
	unique?: boolean
	/**
	 * Allow to apply Regular Expression to the validation process
	 */
	regexp?: RegExp
	/**
	 * Allow to define maximum size of a property
	 */
	max?: number
	/**
	 * Allow to define minimum size of a property
	 */
	min?: number
	/**
	 * Allow to specify what values are accepted
	 */
	acceptedValues?: any[]
	/**
	 * Allow to define the format of the `string` type property
	 */
	format?: SchemaFormat
	/**
	 * Defines a Schema of the `object` type property
	 */
	schema?: SchemaInput
	/**
	 * Defines a Schema of the `array` object type property
	 */
	arrayOf?: SchemaInput
	/**
	 * Defines a Schema of the `array` object type property (the same as arrayOf)
	 */
	arrayType?: Schema
	/**
	 * Allow to define that the property is required
	 */
	presence?: boolean
	/**
	 * Allow to define minimum size of an array property
	 */
	minSize?: number
	/**
	 * Allow to define maximum size of an array property
	 */
	maxSize?: number
	/**
	 * Allow to apply custom validation
	 */
	custom?(
		ctx: any, value: any, parent?: object, output?: { message: string }
	): Promise<boolean> | boolean,
}