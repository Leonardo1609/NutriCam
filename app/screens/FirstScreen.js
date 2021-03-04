import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MainButton } from "../components/MainButton";

export const FirstScreen = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.screen}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.image}
					source={require("../assets/images/nutricam-logo.png")}
				/>
			</View>
			<View style={styles.buttonsContainer}>
				<MainButton
					containerStyle={styles.buttonSeparation}
					onPress={() => navigation.navigate("Login")}
				>
					Iniciar Sesión
				</MainButton>
				<MainButton
					containerStyle={styles.buttonSeparation}
					onPress={() => navigation.navigate("CreateAccount")}
				>
					Crear Cuenta
				</MainButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: "10%",
		backgroundColor: "#e3e3e3",
	},
	buttonSeparation: {
		marginVertical: 20,
	},
	image: {
		width: "100%",
		height: 240,
	},
	logoContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
