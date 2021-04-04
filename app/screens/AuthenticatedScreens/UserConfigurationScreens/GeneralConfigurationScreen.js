import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { colors } from "../../../consts/colors";
import { MainButton } from "../../../components/MainButton";
import { useNavigation } from "@react-navigation/native";

export const GeneralConfigurationScreen = () => {
	const navigation = useNavigation();

	const navToChangeEmail = () => {
		navigation.navigate("ChangeEmail");
	};

	const navToChangePassword = () => {
		navigation.navigate("ChangePassword");
	};

	return (
		<View style={styles.screen}>
			<View style={styles.filtersContainer}>
				<View style={styles.filterContainer}>
					<Text style={styles.switchText}>Activar recordatorios</Text>
					<View style={styles.switchContainer}>
						<Switch trackColor={colors.green} value={true} />
					</View>
				</View>
				<View style={styles.filterContainer}>
					<Text style={styles.switchText}>
						Activar recomendaciones
					</Text>
					<View style={styles.switchContainer}>
						<Switch trackColor={colors.green} value={true} />
					</View>
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={navToChangeEmail}
				>
					Cambiar correo
				</MainButton>
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={navToChangePassword}
				>
					Cambiar contraseña
				</MainButton>
				<MainButton
					buttonStyle={styles.unsubscribeCaloricPlanButton}
					containerStyle={styles.buttonContainer}
				>
					Dar de baja plan calórico
				</MainButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	filtersContainer: {
		flex: 1,
		justifyContent: "center",
	},
	buttonsContainer: {
		flex: 1,
		justifyContent: "center",
	},
	filterContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	switchContainer: {
		flex: 1,
		alignItems: "flex-end",
	},
	switchText: {
		fontSize: 18,
		fontFamily: "poppins-bold",
	},
	buttonContainer: {
		marginVertical: 10,
	},
	unsubscribeCaloricPlanButton: {
		backgroundColor: "red",
	},
});
