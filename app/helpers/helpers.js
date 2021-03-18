import AsyncStorage from "@react-native-async-storage/async-storage";

export const icons = [
	{
		iconName: "cerveza",
		foodCalories: 140,
		image: "beer.png",
	},
	{
		iconName: "dona",
		foodCalories: 360,
		image: "donut.png",
	},
	{
		iconName: "gaseosa",
		foodCalories: 160,
		image: "soda.svg",
	},
	{
		iconName: "pan",
		foodCalories: 180,
		image: "bread.png",
	},
];

export const saveIcon = async (iconName) => {
	const icon = icons.find((icon) => icon.iconName === iconName);
	console.log(icon);
	await AsyncStorage.setItem("icon", JSON.stringify(icon));
};

export const totalCaloriesConsumed = (foods) => {
	const reducer = (acc, cur) => acc + cur.calories;

	if (foods.length) {
		return foods.reduce(reducer, 0);
	}

	return 0;
};

export const formatDate = (date) => {
	const day = date.getDate() / 10 > 1 ? date.getDate() : "0" + date.getDate();
	const month =
		(date.getMonth() + 1) / 10 > 1
			? date.getMonth() + 1
			: "0" + (date.getMonth() + 1);
	const year = date.getFullYear();
	return [year, month, day].join("-");
};
