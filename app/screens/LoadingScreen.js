import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export const LoadingScreen = () => {
	return (
		<View style={styles.screen}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.image}
					source={require("../assets/images/nutricam-logo.png")}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.loadingMessage}>Cargando...</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: "10%",
	},
	image: {
		width: "100%",
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
	logoContainer: {
		width: "100%",
		alignItems: "center",
	},
	textContainer: {},
	loadingMessage: { fontSize: 40, fontFamily: "poppins" },
});
