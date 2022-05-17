import validator from "validator";

import Context from "../../types/context";
import ValidatorError from "../../types/errors";
import Options from "../../types/options";
import Schema from "../../types/schema";
import SchemaInput from "../../types/schema-input";

async function validate(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError, parent?: object) {
    if (schema.type === 'string') {
        await validateString(ctx, schema, value, key, errors, parent);
    } else if (schema.type === 'array') {
        await validateArray(ctx, schema, value, key, errors, parent);
    } else if (schema.type === 'integer') {
        await validateInteger(ctx, schema, value, key, errors);
    } else if (schema.type === 'datetime') {
        await validateDatetime(ctx, schema, value, key, errors);
    } else if (schema.type === 'boolean') {
        await validateBoolean(ctx, schema, value, key, errors, parent);
    } else if (schema.type === 'object') {
        await validateObject(ctx, schema, value, key, errors);
    }
}

async function validateObject(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError) {
    if (schema.options.presence) {
        if (value == undefined) {
            errors[key] = `${key} is not present`;
            return;
        }
    } else if (value === undefined) {
        return;
    }
    if (typeof value !== 'object') {
        errors[key] = `${key} is not a valid object`;
        return;
    }

    if (schema.options.schema) {
        await validateObj(ctx, schema.options.schema, value, errors);
    }
}

async function validateBoolean(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError, parent?: object) {
    if (schema.options.presence) {
        if (value == undefined) {
            errors[key] = `${key} is not present`;
            return;
        }
    } else if (value === undefined) {
        return;
    }
    if (!validator.isBoolean(`${value}`)) {
        errors[key] = `${key} is not a valid boolean`;
        return;
    }
    const output = { message: `${key} value is not valid` };
    if (schema.options.custom && !(await schema.options.custom(ctx, value, parent, output))) {
        errors[key] = `${output.message}`;
    }
}

async function validateString(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError, parent?: object) {
    if (schema.type === 'string') {
        if (schema.options.presence) {
            if (!isString(value)) {
                errors[key] = `${key} is not a valid string`;
                return;
            }
            if (validator.isEmpty(value)) {
                errors[key] = `${key} could not be empty`;
                return;
            }
        } else {
            if (value === undefined || value === null) {
                return;
            } else if (!isString(value)) {
                errors[key] = `${key} is not a valid string`;
                return;
            } else if (validator.isEmpty(value) && !schema.options.min) {
                return;
            }
        }
        if (
            schema.options.format &&
            schema.options.format === 'enum' &&
            schema.options.acceptedValues &&
            !schema.options.acceptedValues.includes(value)
        ) {
            errors[key] = `${key} size is not an accepted value`;
        }
        if (schema.options.min && value.length < schema.options.min) {
            errors[key] = `${key} size is less than than ${schema.options.min}`;
        }
        if (schema.options.min && value.length < schema.options.min) {
            errors[key] = `${key} size is less than than ${schema.options.min}`;
        }
        if (schema.options.max && value.length > schema.options.max) {
            errors[key] = `${key} size is greater than ${schema.options.max}`;
        }
        if (schema.options.format && schema.options.format === 'url' && !validator.isURL(value)) {
            errors[key] = `${key} size is not a valid URL`;
        }
        if (
            schema.options.format &&
            schema.options.format === 'email' &&
            !validator.isEmail(value)
        ) {
            errors[key] = `${key} is not a valid email address`;
        }

        if (schema.options.format && schema.options.format === 'url' && !validator.isURL(value)) {
            errors[key] = `${key} is not a valid url`;
        }

        if (
            schema.options.format &&
            schema.options.format === 'regexp' &&
            !schema.options.regexp!.test(value)
        ) {
            errors[key] = `${key} is invalid`;
        }

        if (schema.options.unique && schema.options.orm) {
            if (!ctx) {
                throw new Error("Invalid context provided to validator");
            }

            const orm = ctx.db[schema.options.orm];
            const count = await orm.count({
                where: { [key]: value, },
            });
            if (count > 0) {
                errors[key] = `${key} is not unique`;
            }
        }

        const output = { message: `${key} value is not valid` };
        if (
            schema.options.custom &&
            !(await schema.options.custom(ctx, value, parent, output))
        ) {
            errors[key] = `${output.message}`;
        }

        if (schema.options.regexp && !schema.options.regexp.test(value)) {
            errors[key] = `The ${key} is not valid`;
        }
    }
}

async function validateArray(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError, parent?: object) {
    if (schema.type === 'array') {
        if ((value === undefined || value == null) && !schema.options.presence) {
            return;
        }
        if (!isArray(value)) {
            errors[key] = `${key} must be a valid array`;
            return;
        }
        if (schema.options.minSize && value.length < schema.options.minSize) {
            errors[key] = `The ${key} size is less than ${schema.options.minSize}`;
        }
        if (schema.options.maxSize && value.length > schema.options.maxSize) {
            errors[key] = `The ${key} size is greater than ${schema.options.maxSize}`;
        }

        const output = { message: `${key} value is not valid` };
        if (schema.options.custom && !(await schema.options.custom(ctx, value, parent, output))) {
            errors[key] = `${output.message}`;
        }

        if (schema.options.arrayOf) {
            for (const item of value) {
                await validateObj(ctx, schema.options.arrayOf, item, errors);
            }
        }
        if (schema.options.arrayType) {
            for (const arValue of value) {
                if (schema.options.arrayType.type === 'string') {
                    await validateString(
                        ctx,
                        schema.options.arrayType,
                        arValue,
                        key,
                        errors,
                        parent
                    );
                } else if (schema.options.arrayType.type === 'array') {
                    await validateArray(
                        ctx,
                        schema.options.arrayType,
                        arValue,
                        key,
                        errors,
                        parent
                    );
                } else if (schema.options.arrayType.type === 'integer') {
                    await validateInteger(
                        ctx,
                        schema.options.arrayType,
                        arValue,
                        key,
                        errors
                    );
                } else if (schema.options.arrayType.type === 'datetime') {
                    await validateDatetime(
                        ctx,
                        schema.options.arrayType,
                        arValue,
                        key,
                        errors
                    );
                } else if (schema.options.arrayType.type === 'boolean') {
                    await validateBoolean(
                        ctx,
                        schema.options.arrayType,
                        arValue,
                        key,
                        errors,
                        parent
                    );
                }
            }
        }
    }
}

async function validateObj(ctx: Context, schema: SchemaInput, value: any, errors: ValidatorError, options?: Options) {
    const valueKeys = Object.keys(value);
    const schemaKeys = Object.keys(schema).filter((key) => schema[key].options.presence == true);
    const keys = new Set(valueKeys.concat(schemaKeys));
    for (const key of keys) {
        const typedef = schema[key];
        if (typedef) {
            await validate(ctx, typedef, value[key], key, errors, value);
        } else if (!options?.unknownKey) {
            errors[key] = 'Unrecognized property';
        }
    }
}

async function isFieldValid(ctx: Context, schema: Schema, value: any) {
    const errors: { [key: string]: string } = {};
    const key = 'field';
    await validate(ctx, schema, value, key, errors);
    return !errors[key];
}

function validateDatetime(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError) {
    if (schema.options.presence) {
        if (!value) {
            errors[key] = `${key} is not present`;
            return;
        }
    } else if (value === undefined || value === null || validator.isEmpty(value)) {
        return;
    }
    if (!validator.isISO8601(value)) {
        errors[key] = `${key} is not a valid iso-8601 datetime`;
        return;
    }
}

function validateInteger(ctx: Context, schema: Schema, value: any, key: string, errors: ValidatorError) {
    if (schema.options.presence) {
        if (!value && value !== 0) {
            errors[key] = `${key} is not present`;
            return;
        }
    } else if (value === undefined || value === null) {
        return;
    }

    if (!isInteger(value)) {
        errors[key] = `${key} is not a valid integer`;
        return;
    }
    if (isInteger(schema.options.min) && value < (schema.options.min as number)) {
        errors[key] = `${key} is less than ${schema.options.min}`;
    }
    if (isInteger(schema.options.max) && value > (schema.options.max as number)) {
        errors[key] = `${key} is greater than ${schema.options.max}`;
    }
}

function isString(value: any) {
    return typeof value === 'string' || value instanceof String;
}

function isArray(value: any) {
    return Array.isArray(value) || value instanceof Array;
}

function isInteger(value: any) {
    return validator.isInt(`${value}`);
}

export {
    isArray,
    isString,
    validate,
    validateObj,
    validateString,
    validateBoolean,
    validateInteger,
    validateDatetime,
    isFieldValid,
};
