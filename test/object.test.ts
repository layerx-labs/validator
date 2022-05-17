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
			name: {
				type: 'string',
				options: {
					presence: true
				}
			},
			address: {
				type: 'object',
				options: {
					presence: true,
					schema: {
						city: {
							type: 'string',
							options: {
								presence: true,
							}
						},
						street: {
							type: 'string',
							options: {
								presence: false,
							}
						}
					}
				}
			}
		}, {
			name: 'John Doe',
			address: {
				city: 'Luanda',
				street: 'Av. 2nd Almeida'
			}
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});
});