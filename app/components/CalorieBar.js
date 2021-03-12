import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {useSelector} from "react-redux";

export const CalorieBar = () => {

	const { userInformation } = useSelector( state => state.auth );

	return (
		<View style={styles.calorieBarContainer}>
			<Text style={styles.calorieTitle}>Calorías</Text>
			<View style={styles.barContainer}>
				<View style={styles.barAdvance}></View>
			</View>
			<View style={styles.descriptionsContainer}>
				<View>
					<Text style={styles.descriptionText}>Meta</Text>
					<Text style={styles.targetText}>{ userInformation.profile.profile_caloric_plan }</Text>
				</View>
				<View>
					<Text style={styles.descriptionText}>Consumido</Text>
					<Text style={styles.consumedText}>280</Text>
				</View>
				<View>
					<Text style={styles.descriptionText}>Restante</Text>
					<Text style={styles.remainingText}>1720</Text>
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
		color: 'black',
		fontWeight: 'bold'
	},
	consumedText: {
		textAlign: "center",
		fontSize: 16,
		fontWeight: 'bold'
	},
	remainingText: {
		textAlign: "right",
		fontSize: 16,
		fontWeight: 'bold'
	},
	barContainer: {
		borderColor: "black",
		borderWidth: 1,
		height: 20,
		marginVertical: 10
	},
	barAdvance: {
		width: '20%',
		backgroundColor: 'red',
		height: '100%'
	},
});
