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
			isActive: {
				type: 'boolean',
				options: {
					presence: true,
				}
			}
		}, {
			isActive: true
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "true" if "presence: false" and model matches the schema', async () => {

		const isValid = await validator.validate({
			isActive: {
				type: 'boolean',
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
			isActive: {
				type: 'boolean',
				options: {
					presence: true
				}
			}
		}, {});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'isActive': 'isActive is not present'
		});
	});
});