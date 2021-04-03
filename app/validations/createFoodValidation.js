export const createFoodValidation = (values) => {
	const {
		foodName,
		measureUnit,
		foodCalories,
		foodFats,
		foodCarbohydrates,
		foodProteins,
	} = values;

	let errors = {};

	if (!foodName) {
		errors = {
			...errors,
			foodName: true,
		};
	}

	if (!measureUnit) {
		errors = {
			...errors,
			measureUnit: true,
		};
	}

	if (!foodCalories || foodCalories < 0) {
		errors = {
			...errors,
			foodCalories: true,
		};
	}

	if (foodProteins < 0) {
		errors = {
			...errors,
			foodProteins: true,
		};
	}

	if (foodCarbohydrates < 0) {
		errors = {
			...errors,
			foodCarbohydrates: true,
		};
	}

	if (foodFats < 0) {
		errors = {
			...errors,
			foodFats: true,
		};
	}

	return errors;
};
