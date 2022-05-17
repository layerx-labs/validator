import SchemaOptions from "./schema-options";
import SchemaType from "./schema-type";

export default interface Schema {
	/**
	 * Defines the type of the property to be validated
	 */
	type: SchemaType,
	/**
	 * The options of the validation process
	 */
	options: SchemaOptions
}