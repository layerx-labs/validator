import SchemaType from "./schema-type";

export default interface Schema {
	type: SchemaType,
	options: {
		orm?: string
        unique?: boolean
        regexp?: RegExp
        max?: number
        min?: number
        acceptedValues?: any[]
        format?: string
        schema?: Schema
        arrayOf?: Schema
        arrayType?: Schema
		presence?: boolean
		minSize?: number		
		maxSize?: number		
		validateFuncErrorMsg?: string		
		validateFunc?: (
			ctx: any, value: any, parent?: object
		) => Promise<any> | void,
	}
}