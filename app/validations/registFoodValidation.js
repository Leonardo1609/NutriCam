export const registFoodValidation = (values) => {
	const { dayIdToRegist, quantity } = values;
	let errors = {};

	if (!dayIdToRegist) {
		errors = {
			...errors,
			dayIdToRegist: true,
		};
	}

	if (!Number(quantity)) {
		errors = {
			...errors,
			quantity: true,
		};
	}

	return errors;
};
