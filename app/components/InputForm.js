import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const InputForm = ({
	label,
	onChangeText,
	value,
	autoCapitalize,
	containerStyle,
	inputStyle,
	secureTextEntry,
}) => {
	const [security, setSecurity] = useState(false);

	const handleSecurity = () => {
		setSecurity(!security);
	};

	useEffect(() => {
		if (secureTextEntry) setSecurity(true);
	}, []);

	return (
		<View style={{ ...styles.inputGroup, ...containerStyle }}>
			<Text style={styles.label}>{label}</Text>
			<View style={styles.inputContainer}>
				<TextInput
					secureTextEntry={security}
					style={{ ...styles.input, ...inputStyle }}
					onChangeText={onChangeText}
					value={value}
					autoCapitalize={autoCapitalize}
				/>
				{secureTextEntry && (
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={handleSecurity}
						style={styles.eyeButton}
					>
						<Ionicons
							name={security ? "ios-eye-off" : "ios-eye"}
							size={25}
						/>
					</TouchableOpacity>
				)}
			</View>
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
	inputContainer: {
		position: "relative",
	},
	input: {
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
		paddingHorizontal: 5,
		fontSize: 18,
	},
	eyeButton: {
		position: "absolute",
		right: 10,
	},
});
