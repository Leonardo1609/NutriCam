import React from "react";
import { StyleSheet, View, Text } from "react-native";

export const BoxMessage = (props) => {
	return (
		<View style={styles.box}>
			<Text style={styles.textBox}>{props.children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	box: {
		width: "100%",
		paddingVertical: 10,
		borderColor: "black",
		borderWidth: 1,
		elevation: 1 
	},
	textBox: {
		textAlign: "center",
		fontSize: 24,
		fontFamily: "poppins-bold",
	},
});
