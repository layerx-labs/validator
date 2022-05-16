import Options from "../types/options";
import Schema from "../types/schema";
import { validateObj } from "./core/functions";

class Validator {
    errors = {};
    ctx = {};

    constructor(ctx: any) {
        this.ctx = ctx;        
    }

    async validate(schema: Schema, data: any, options?: Options) {
        await validateObj(this.ctx, schema, data, this.errors, options);
        return Object.keys(this.errors).length === 0;
    }
}

export {
    Validator as default
};