import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export const LoadingScreen = () => {
	return (
		<View style={styles.screen}>
			<Image
				style={styles.image}
				source={require("../assets/images/nutricam-logo.png")}
			/>
			<Text>Cargando...</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: '10%'
	},
	image: {
		width: "100%",
		resizeMode: "contain",
	},
});
