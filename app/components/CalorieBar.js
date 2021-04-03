import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { totalCaloriesConsumed } from "../helpers/helpers";
import { colors } from "../consts/colors";

export const CalorieBar = () => {
	const { userInformation } = useSelector((state) => state.auth);

	const { foodRegisters } = useSelector((state) => state.nutritionSummary);

	const calculateAdvancePercentage = () => {
		return (
			(totalCaloriesConsumed(foodRegisters) /
				userInformation.profile.profile_caloric_plan) *
			100
		);
	};

	const setWidthAdvance = () => {
		const percentage = calculateAdvancePercentage();
		return `${percentage < 100 ? percentage : 100}%`;
	};

	const setBarColor = () => {
		const percentage = calculateAdvancePercentage();
		if (percentage < 80) {
			return "#f5eb31";
		} else if (percentage > 80 && percentage < 120) {
			return colors.green;
		} else if (percentage > 120) {
			return "red";
		}
	};

	const calculateRemaining = useCallback(() => {
		const remaining =
			userInformation.profile.profile_caloric_plan -
			totalCaloriesConsumed(foodRegisters);
		return remaining > 0 ? remaining : 0;
	}, [userInformation, foodRegisters]);

	if (!userInformation.profile.profile_have_caloric_plan) return null;

	return (
		<View style={styles.calorieBarContainer}>
			<Text style={styles.calorieTitle}>Calorías</Text>
			<View style={styles.barContainer}>
				<View
					style={{
						...styles.barAdvance,
						width: setWidthAdvance(),
						backgroundColor: setBarColor(),
					}}
				></View>
			</View>
			<View style={styles.descriptionsContainer}>
				<View>
					<Text style={styles.descriptionText}>Meta</Text>
					<Text style={styles.targetText}>
						{userInformation.profile.profile_caloric_plan}
					</Text>
				</View>
				<View>
					<Text style={styles.descriptionText}>Consumido</Text>
					<Text style={styles.consumedText}>
						{totalCaloriesConsumed(foodRegisters)}
					</Text>
				</View>
				<View>
					<Text style={styles.descriptionText}>Restante</Text>
					<Text style={styles.remainingText}>
						{calculateRemaining()}
					</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	calorieBarContainer: {
		width: "100%",
	},
	calorieTitle: {
		fontSize: 20,
		fontFamily: "poppins-bold",
	},
	descriptionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	descriptionText: {
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	targetText: {
		textAlign: "left",
		fontSize: 16,
		color: "black",
		fontWeight: "bold",
	},
	consumedText: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: "bold",
	},
	remainingText: {
		textAlign: "right",
		fontSize: 16,
		fontWeight: "bold",
	},
	barContainer: {
		borderColor: "black",
		borderWidth: 1,
		height: 20,
		marginVertical: 10,
	},
	barAdvance: {
		height: "100%",
		backgroundColor: "red",
	},
});
