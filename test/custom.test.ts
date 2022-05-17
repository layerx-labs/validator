import Validator from "../lib/index";

describe('When I call validate method', () => {
	let validator: Validator;

	beforeAll(() => {
		validator = new Validator({});
	});

	it('Returns "false" with error messages if the model matches the custom validation', async () => {
		const isValid = await validator.validate({
			imageUrl: {
				type: 'string',
				options: {
					presence: true,
					custom(_, value, __, output?) {
						const isTaikaiUser = value.endsWith('.png');

						if (!isTaikaiUser)
							output.message = "Invalid format for image, try .png"

						return isTaikaiUser;
					},
				}
			}
		}, {
			imageUrl: 'file://c:/folder/image.jpeg'
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'imageUrl': 'Invalid format for image, try .png'
		});
	});

	it('Returns "false" with default error message if output message was not set', async () => {
		const isValid = await validator.validate({
			imageUrl: {
				type: 'string',
				options: {
					presence: true,
					custom(_, value, __) {
						const isTaikaiUser = value.endsWith('.png');
						return isTaikaiUser;
					},
				}
			}
		}, {
			imageUrl: 'file://c:/folder/image.jpeg'
		});

		expect(isValid).toBe(false);
		expect(validator.errors).toEqual({
			'imageUrl': 'imageUrl value is not valid'
		});
	});
});