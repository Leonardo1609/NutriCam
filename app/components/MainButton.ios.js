import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../consts/colors";

export const MainButton = (props) => {
	return (
		<TouchableOpacity style={styles.button} onPress={props.onPress}>
			<Text style={styles.buttonText}>{props.children}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		elevation: 3,
	},
	button: {
		paddingVertical: 10,
		backgroundColor: colors.green,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 24,
		textAlign: "center",
		color: "white",
		textShadowColor: "rgba(0,0,0,0.75)",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10,
		fontFamily: "poppins-bold",
	},
});
