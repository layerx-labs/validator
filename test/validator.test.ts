import Validator from "../lib/index";

describe('When I call validate method', () => {
	let validator: Validator;

	beforeAll(() => {
		validator = new Validator({});
	});

	it('Returns "true" with no error messages if the model matches the schema', async () => {

		const isValid = await validator.validate({
			name: {
				type: 'string',
				options: {
					presence: true
				}
			}
		}, {
			name: 'Afonso Matumona'
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "true" with no error messages if the schema does not required the property', async () => {

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

	it('Returns "false" with error messages when the input is empty', async () => {

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

	it('Returns false with error messages ', async () => {
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

});