import SchemaInput from "./schema-input"
import Schema from "./schema"

export default interface SchemaOptions {
	orm?: string
	unique?: boolean
	regexp?: RegExp
	max?: number
	min?: number
	acceptedValues?: any[]
	format?: string
	schema?: SchemaInput
	arrayOf?: SchemaInput
	arrayType?: Schema
	presence?: boolean
	minSize?: number
	maxSize?: number
	validateFuncErrorMsg?: string
	validateFunc?: (
		ctx: any, value: any, parent?: object
	) => Promise<boolean> | boolean,
}