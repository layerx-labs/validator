import SchemaOptions from "./schema-options";
import SchemaType from "./schema-type";

export default interface Schema {
	type: SchemaType,
	options: SchemaOptions
}