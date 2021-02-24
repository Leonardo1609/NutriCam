import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const ErrorText = (props) => {
	return (
		<View
			style={ styles.errorContainer }	
		>
			<Text style={ styles.error }>{props.children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	errorContainer: {
		width: '80%'
	},
	error: {
		color: 'red',
		textAlign: 'left',
		fontWeight: 'bold'
	}
})
