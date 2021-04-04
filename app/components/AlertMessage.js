import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../consts/colors";

const setBackground = (type) => (type === "warning" ? "red" : colors.green);

export const AlertMessage = ({ type, message }) => {
	return (
		<View
			style={{
				...styles.messageContainer,
				backgroundColor: setBackground(type),
			}}
		>
			<Text style={styles.message}>{message}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	messageContainer: {
		width: "100%",
		marginTop: 10,
		padding: 10,
		borderRadius: 10,
	},
	message: {
		fontSize: 18,
		textAlign: "center",
		color: "white",
		fontFamily: "poppins-bold",
	},
});
