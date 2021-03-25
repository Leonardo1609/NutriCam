import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	startGetWeeklyCalories,
	setDateOfSummary,
} from "../actions/nutritionSummaryActions";
import { useNavigation } from "@react-navigation/native";
import { daysFirstLetter } from "../helpers/helpers";
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

	const setBarColor = (caloriesConsumed) => {
		const percentage = calculateAdvancePercentage(caloriesConsumed);
		if (percentage < 80) {
			return "#f5eb31";
		} else if (percentage > 80 && percentage < 120) {
			return colors.green;
		} else if (percentage > 120) {
			return "red";
		}
	};

	const goToDiarySummary = (date) => {
		dispatch(setDateOfSummary(date));
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
					onPress={goToDiarySummary.bind(this, dayCalories.weekday)}
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
										dayCalories.calories
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
