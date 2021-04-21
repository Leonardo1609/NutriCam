import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { AlertMessage } from "../components/AlertMessage";
import { MainButton } from "../components/MainButton";

export const FirstScreen = () => {
	const { messageSuccess } = useSelector((state) => state.ui);

	const navigation = useNavigation();
	return (
		<View style={styles.screen}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.image}
					source={require("../assets/images/nutricam-logo.png")}
				/>
			</View>
			{messageSuccess && (
				<AlertMessage type="success" message={messageSuccess} />
			)}
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
		resizeMode: "contain",
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
