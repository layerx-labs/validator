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
			contacts: {
				type: 'array',
				options: {
					presence: true,
					arrayOf: {
						type: {
							type: 'string',
							options: {
								presence: true,
							}
						},
						value: {
							type: 'string',
							options: {
								presence: true,
							}
						}
					}
				}
			}
		}, {
			name: 'John Doe',
			contacts: [
				{
					type: 'phone',
					value: '+244 923568978'
				},
				{
					type: 'email',
					value: 'john.doe@taikai.network'
				}
			]
		});

		expect(isValid).toBe(true);
		expect(validator.errors).toEqual({});
	});
});