import Context from "../types/context";
import ValidatorError from "../types/errors";
import Options from "../types/options";
import Schema from "../types/schema";
import SchemaFormat from "../types/schema-format";
import SchemaInput from "../types/schema-input";
import SchemaOptions from "../types/schema-options";
import SchemaType from "../types/schema-type";
import { validateObj } from "./core/functions";

class Validator {
    private ctx: Context;

    errors: ValidatorError = {};

    constructor(ctx: Context) {
        this.ctx = ctx;   
    }

    async validate(schema: SchemaInput, data: object, options?: Options) {
        await validateObj(this.ctx, schema, data, this.errors, options);
        return Object.keys(this.errors).length === 0;
    }

    reset() {
        this.errors = {};
    }
}

export {
    Validator as default,
    Schema,
    SchemaInput,
    SchemaOptions,
    SchemaType,
    SchemaFormat,
    Options,
    ValidatorError,
    Context,
};
