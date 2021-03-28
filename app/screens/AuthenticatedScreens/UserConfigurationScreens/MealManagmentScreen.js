import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const MealManagementScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>MealManagementScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
});
