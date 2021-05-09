import React from "react";
import { StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../consts/colors";

export const SpinnerLoading = ({ loadingCondition, message }) => {
	return (
		<Spinner
			visible={loadingCondition}
			textContent={message}
			textStyle={styles.loadingText}
			color={colors.green}
			overlayColor="rgba(0,0,0, 0.6)"
		/>
	);
};

const styles = StyleSheet.create({
	loadingText: {
		color: colors.green,
		fontSize: 30,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
});
