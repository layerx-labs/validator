import Validator from "../lib/index";

describe('When I call validate method string', () => {
	let validator: Validator;

	beforeAll(() => {
		validator = new Validator({});
	});

	beforeEach(() => {
		validator.reset();	
	})

	it('Returns "true" with no error messages if "options.presence" and model matches the schema', async () => {

		const isValid = await validator.validate({
			age: {
				type: 'integer',
				options: {
					presence: true,
				}
			}
		}, {
			age: 0
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "true" if "presence: false" and model matches the schema', async () => {

		const isValid = await validator.validate({
			age: {
				type: 'integer',
				options: {
					presence: false
				}
			}
		}, {});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "false" with error message if the schema does not match', async () => {
		const isValid = await validator.validate({
			age: {
				type: 'integer',
				options: {
					presence: true
				}
			}
		}, {});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'age': 'age is not present'
		});
	});

	it('Returns "false" with error message if the value is greater', async () => {
		const isValid = await validator.validate({
			age: {
				type: 'integer',
				options: {
					presence: true,
					min: 1,
				}
			}
		}, {
			age: 0
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'age': 'age is less than 1'
		});
	});
});