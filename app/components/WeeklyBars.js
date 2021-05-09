import React, { useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	startGetWeeklyCalories,
	setDateOfSummary,
} from "../actions/nutritionSummaryActions";
import { useNavigation } from "@react-navigation/native";
import { daysFirstLetter, parserDateToLocale } from "../helpers/helpers";
import { colors } from "../consts/colors";

export const WeeklyBars = ({ weekDay }) => {
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);
	const navigation = useNavigation();

	const { weeklyCalories, foodRegisters } = useSelector(
		(state) => state.nutritionSummary
	);

	const calculateAdvancePercentage = (caloriesConsumed) => {
		return (
			(caloriesConsumed / userInformation.profile.profile_caloric_plan) *
			100
		);
	};

	const setHeightdvance = (caloriesConsumed) => {
		const percentage = calculateAdvancePercentage(caloriesConsumed);
		return `${percentage < 100 ? percentage : 100}%`;
	};

	const setBarColor = (caloriesConsumed, weekday) => {
		const percentage = calculateAdvancePercentage(caloriesConsumed);
		if (
			parserDateToLocale(
				userInformation?.profile?.profile_initial_date_caloric_plan
			) > parserDateToLocale(weekday)
		) {
			return "#d9dad7";
		} else if (percentage < 90) {
			return "#f5eb31";
		} else if (percentage > 90 && percentage < 110) {
			return colors.green;
		} else if (percentage > 110) {
			return "red";
		}
	};

	const goToDiarySummary = (dayCalories) => {
		if (
			parserDateToLocale(
				userInformation?.profile?.profile_initial_date_caloric_plan
			) > parserDateToLocale(dayCalories.weekday) &&
			dayCalories.calories
		) {
			return Alert.alert(
				"Antes de la actualización de datos",
				"El siguiente resumen nutricional pertenece a un día previo a tu actualización de datos",
				[
					{
						text: "Cancelar",
						style: "cancel",
					},
					{
						text: "Continuar",
						onPress: () => {
							dispatch(setDateOfSummary(dayCalories.weekday));
							navigation.navigate("DiarySummary");
						},
					},
				]
			);
		}
		if (!dayCalories.calories) {
			return Alert.alert(
				"Sin registros",
				"No realizó registros en el día seleccionado"
			);
		}

		dispatch(setDateOfSummary(dayCalories.weekday));
		navigation.navigate("DiarySummary");
	};

	useEffect(() => {
		dispatch(startGetWeeklyCalories(weekDay));
	}, [foodRegisters]);

	if (!weeklyCalories) return null;

	return (
		<View style={styles.barsContainer}>
			{weeklyCalories.map((dayCalories, idx) => (
				<TouchableWithoutFeedback
					onPress={goToDiarySummary.bind(this, dayCalories)}
					key={dayCalories.weekday}
				>
					<View style={styles.barContainer}>
						<View style={styles.bar}>
							<View
								style={{
									height: setHeightdvance(
										dayCalories.calories
									),
									backgroundColor: setBarColor(
										dayCalories.calories,
										dayCalories.weekday
									),
								}}
							></View>
						</View>
						<View style={styles.letterContainer}>
							<Text style={styles.letter}>
								{daysFirstLetter[idx]}
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	barsContainer: {
		width: 280,
		height: 220,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	barContainer: {
		width: "10%",
		height: "100%",
	},
	bar: {
		height: "80%",
		borderColor: "black",
		borderWidth: 1,
		justifyContent: "flex-end",
	},
	letterContainer: {
		height: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	letter: {
		fontFamily: "poppins-bold",
		fontSize: 16,
	},
});
