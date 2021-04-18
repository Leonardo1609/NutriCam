import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../consts/colors";

export const daysFirstLetter = ["L", "M", "M", "J", "V", "S", "D"];

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
		image: "soda.png",
	},
	{
		iconName: "pan",
		foodCalories: 110,
		image: "bread.png",
	},
];

export const activityLevels = new Map([
	[1, "Sedentaria"],
	[2, "Ligera"],
	[3, "Moderada"],
	[4, "Intensa"],
]);

export const genres = new Map([
	["M", "Masculino"],
	["F", "Femenino"],
]);

export const dayFoodMap = new Map([
	[1, "Registrar Desayuno"],
	[2, "Registrar Media Mañana"],
	[3, "Registrar Almuerzo"],
	[4, "Registrar Media Tarde"],
	[5, "Registrar Cena"],
]);

export const measureUnitMap = new Map([
	[1, "100gr"],
	[2, "Unidad"],
	[3, "Plato"],
]);

export const toTwoDecimals = (number) => {
	return parseFloat(number).toFixed(2);
};

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
	const day =
		date.getDate() / 10 >= 1 ? date.getDate() : "0" + date.getDate();
	const month =
		(date.getMonth() + 1) / 10 > 1
			? date.getMonth() + 1
			: "0" + (date.getMonth() + 1);
	const year = date.getFullYear();
	return [year, month, day].join("-");
};

// Fix the bug of by 1 day
export const parserDateToLocale = (stringDate) => {
	const splitedDate = stringDate.split("-");
	const parserDate = new Date(
		splitedDate[0],
		splitedDate[1] - 1,
		splitedDate[2]
	);

	return parserDate;
};

// Arregla el problema de que una fecha guardada en el AsyncStorage cuando se hace el getItem con el JSON.parse sigue siendo un string.
export const parserAndFormatDateToLocale = (date) => {
	return parserDateToLocale(formatDate(new Date(date)));
};

export const formatHour = (hours, minutes) => {
	const parseHour = hours >= 10 ? hours : "0" + hours;
	const parseMinutes = minutes >= 10 ? minutes : "0" + minutes;

	return parseHour + ":" + parseMinutes;
};

export const setTargetMessage = (status) => {
	if (status === "unfulfilled") {
		return {
			message:
				"No has consumido las calorías necesarias, no es saludable limitarse",
			color: "orange",
		};
	} else if (status === "success") {
		return {
			message: "Has cumplido con tu plan calórico diario, ¡bien hecho!",
			color: colors.green,
		};
	} else if ("exceded") {
		return {
			message: "Has excedido tus calorías diarias",
			color: "red",
		};
	}
};
