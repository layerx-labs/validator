import Validator from "../lib/index";

describe('When I call validate method string', () => {
	let validator: Validator;

	beforeAll(() => {
		validator = new Validator({});
	});

	beforeEach(() => {
		validator.reset();	
	});

	it('Returns "true" if "presence: true" and model matches the schema', async () => {

		const isValid = await validator.validate({
			name: {
				type: 'string',
				options: {
					presence: true
				}
			}
		}, {
			name: 'John'
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "true" if "presence: false" and model matches the schema', async () => {

		const isValid = await validator.validate({
			name: {
				type: 'string',
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
			name: {
				type: 'string',
				options: {
					presence: true
				}
			}
		}, {});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'name': 'name is not a valid string'
		});
	});

	it('Returns "false" with error message if "presence: true" but value is invalid', async () => {
		const isValid = await validator.validate({
			name: {
				type: 'string',
				options: {
					presence: true
				}
			}
		}, {
			name: ''
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'name': 'name could not be empty'
		});
	});

	it('Returns "false" with error message if the value is greater', async () => {
		const isValid = await validator.validate({
			name: {
				type: 'string',
				options: {
					presence: true,
					max: 5,
				}
			}
		}, {
			name: 'John Doe'
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'name': 'name size is greater than 5'
		});
	});
});