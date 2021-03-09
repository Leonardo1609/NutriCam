import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../consts/colors";

export const DayFood = ({ title, data, total, dayId, recommended }) => {
	return (
		<View style={styles.dayFoodContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
				<Ionicons name="ios-add" size={20} />
			</View>
			{ data && data.lenght ? (
				<View></View>
			) : (
				<View style={styles.recommendedContainer}>
					<Text style={styles.recommendedText}>
						{recommended} Calorías
					</Text>
				</View>
			)}
			<View style={styles.totalContainer}>
				<Text style={styles.total}>
					{title} total: {total ? total : "--"}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dayFoodContainer: {
		width: "100%",
		borderColor: "black",
		borderWidth: 1,
		padding: 5,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontFamily: "poppins-bold",
	},
	recommendedText: {
		fontSize: 24,
		fontFamily: "poppins-bold",
		color: colors.grayPlaceholder,
	},
	totalContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	totalText: {
		textAlign: 'right'
	}
});
