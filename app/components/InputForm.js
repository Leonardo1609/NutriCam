import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export const InputForm = ({
	label,
	onChangeText,
	value,
	autoCapitalize,
	containerStyle,
	inputStyle,
	secureTextEntry,
}) => {
	return (
		<View style={{ ...styles.inputGroup, ...containerStyle }}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				secureTextEntry={secureTextEntry}
				style={{ ...styles.input, ...inputStyle }}
				onChangeText={onChangeText}
				value={value}
				autoCapitalize={autoCapitalize}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputGroup: {
		width: "100%",
	},
	label: {
		fontSize: 18,
		marginBottom: 5,
	},
	input: {
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
		paddingHorizontal: 5,
		fontSize: 18 
	},
});
