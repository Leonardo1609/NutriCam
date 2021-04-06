import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { formatDate, totalCaloriesConsumed } from "../../helpers/helpers";
import { colors } from "../../consts/colors";
import { WeeklyBars } from "../../components/WeeklyBars";

export const MyWeekScreen = () => {
	const { userInformation } = useSelector((state) => state.auth);
	const { foodRegisters } = useSelector((state) => state.nutritionSummary);

	const [weekDay, setWeekDay] = useState(formatDate(new Date()));

	const calculateRemaining = useCallback(() => {
		const remaining =
			userInformation.profile.profile_caloric_plan -
			totalCaloriesConsumed(foodRegisters);
		return remaining > 0 ? remaining : 0;
	}, [userInformation, foodRegisters]);

	return (
		<View style={styles.screen}>
			<View style={styles.caloricPlanContainer}>
				<View style={styles.caloricPlan}>
					<Text style={styles.caloricPlanValue}>
						{userInformation.profile.profile_caloric_plan}
					</Text>
					<Text style={styles.calorieText}>Calorías</Text>
				</View>
			</View>
			<View style={styles.consumedContainer}>
				<Text style={styles.consumedText}>
					{totalCaloriesConsumed(foodRegisters)} calorías consumidas
					hoy
				</Text>
			</View>
			<View>
				<WeeklyBars weekDay={weekDay} />
			</View>
			<View style={styles.remainingContainer}>
				<Text style={styles.remainingText}>
					{calculateRemaining()} calorías restantes por hoy
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: "10%",
		backgroundColor: "white",
		alignItems: "center",
	},
	caloricPlanContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 10,
	},
	caloricPlan: {
		borderWidth: 3,
		borderColor: colors.green,
		width: 100,
		height: 100,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 50,
	},
	caloricPlanValue: {
		fontFamily: "poppins-bold",
		fontSize: 20,
	},
	calorieText: {
		fontFamily: "poppins",
		fontSize: 15,
	},
	consumedContainer: {
		marginVertical: 10,
	},
	consumedText: {
		fontFamily: "poppins",
		fontSize: 15,
	},
	remainingContainer: {
		marginVertical: 10,
	},
	remainingText: {
		fontFamily: "poppins-bold",
		fontSize: 16,
	},
});
