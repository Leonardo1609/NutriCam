export const totalCaloriesConsumed = (foods) => {
	const reducer = (acc, cur) => acc + cur.calories;

	if (foods.length) {
		return foods.reduce(reducer, 0);
	}

	return 0;
};
