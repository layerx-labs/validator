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
			birthday: {
				type: 'datetime',
				options: {
					presence: true
				}
			}
		}, {
			birthday: '2020-06-12'
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});

	it('Returns "false" if date is invalid', async () => {

		const isValid = await validator.validate({
			birthday: {
				type: 'datetime',
				options: {
					presence: true
				}
			}
		}, {
			birthday: '2010-13-13'
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'birthday': 'birthday is not a valid iso-8601 datetime',
		});
	});


	it('Returns "true" if "presence: false" and model matches the schema', async () => {
		const isValid = await validator.validate({
			birthday: {
				type: 'datetime',
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
			birthday: {
				type: 'datetime',
				options: {
					presence: true
				}
			}
		}, {});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'birthday': 'birthday is not present'
		});
	});
});