import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { colors } from "../consts/colors";
import { types } from "../types/types";

export const daysFirstLetter = ["L", "M", "M", "J", "V", "S", "D"];

const aComer = "¡A comer!";

export const reminderMessages = [
	`${aComer} Tu desayuno te espera`,
	`${aComer} Tu media mañana te espera`,
	`${aComer} Tu almuerzo te espera`,
	`${aComer} Tu media tarde te espera`,
	`${aComer} Tu cena te espera`,
];

export const improvementFilters = new Map([
	["search", "Por búsqueda"],
	["improvement", "IMC mejorado"],
	["mantained", "IMC mantenido"],
	["worsen", "IMC empeorado"],
]);

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
		foodCalories: 95,
		image: "bread.png",
	},
];

export const activityLevels = new Map([
	[1, "Sedentaria"],
	[2, "Ligera"],
	[3, "Moderada"],
	[4, "Intensa"],
]);

export const filterReviews = [
	"Todos los reviews",
	"1 estrellas",
	"2 estrellas",
	"3 estrellas",
	"4 estrellas",
	"5 estrellas",
];

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

export const totalCaloriesConsumed = (foods = []) => {
	const reducer = (acc, cur) => acc + cur.calories;

	if (foods.length > 0) {
		return foods.reduce(reducer, 0);
	}

	return 0;
};

export const formatDate = (date) => {
	const day =
		date.getDate() / 10 >= 1 ? date.getDate() : "0" + date.getDate();
	const month =
		(date.getMonth() + 1) / 10 >= 1
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

export const getPartOfHour = (hoursAndMinuts, part) => {
	if (part === "hours") {
		const hours = Number(hoursAndMinuts.slice(0, 2));
		return hours;
	}

	if (part === "minutes") {
		const minuts = Number(hoursAndMinuts.slice(3, 6));
		return minuts;
	}
};

export const errorMessageLogoutAction = (err, dispatch) => {
	if (err && err?.status === 401)
		showMessage({
			message: "Sesión expirada",
			description: err.data.msg,
			type: "danger",
			duration: 5000,
			textStyle: { color: "white", fontFamily: "poppins-bold" },
			onPress: () => {
				dispatch({ type: types.logout });
			},
		});
};
