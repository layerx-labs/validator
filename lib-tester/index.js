const { default: Validator } = require("@taikai/validator");

(async () => {
	const validator = new Validator({});
	const isValid1 = await validator.validate({
		name: {
			type: 'string',
			options: {
				presence: true
			}
		}
	}, {});

	// Validating Wrong input
	console.log('#1 Attemp');
	console.log('Is Valid Model: ', isValid1);
	console.log('Validation Errors: ', validator.errors);

	// Reseting error object
	validator.reset();

	const isValid2 = await validator.validate({
		name: {
			type: 'string',
			options: {
				presence: false
			}
		}
	}, {});

	// Validating Wrong input
	console.log('#2 Attemp');
	console.log('Is Valid Model: ', isValid2);
	console.log('Validation Errors: ', validator.errors);

	// Reseting error object
	validator.reset();

	const isValid3 = await validator.validate({
		name: {
			type: 'string',
			options: {
				presence: false
			}
		}
	}, {
		name: 'Afonso Matumona'
	});

	// Validating Wrong input
	console.log('#3 Attemp');
	console.log('Is Valid Model: ', isValid3);
	console.log('Validation Errors: ', validator.errors);
})();