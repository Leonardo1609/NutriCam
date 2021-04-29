import React from "react";
import { StyleSheet, View, Text, Switch, Alert } from "react-native";
import { colors } from "../../../consts/colors";
import { MainButton } from "../../../components/MainButton";
import { startUnsubscribeNutritionalPlan } from "../../../actions/authActions";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { askForUnsubscribeAlert } from "../../../consts/consts";

export const ChangeEmailPasswordScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);

	const navToChangeEmail = () => {
		navigation.navigate("ChangeEmail");
	};

	const navToChangePassword = () => {
		navigation.navigate("ChangePassword");
	};

	const navToHome = () => {
		navigation.navigate("Home");
	};

	const unsubscribeCaloricPlanSubmit = () => {
		Alert.alert("Dar de baja plan calórico", askForUnsubscribeAlert, [
			{
				text: "Cancelar",
				style: "cancel",
			},
			{
				text: "Estoy seguro",
				onPress: () => {
					dispatch(startUnsubscribeNutritionalPlan(navToHome));
				},
			},
		]);
	};

	return (
		<View style={styles.screen}>
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
				{userInformation?.profile?.profile_have_caloric_plan && (
					<MainButton
						onPress={unsubscribeCaloricPlanSubmit}
						buttonStyle={styles.unsubscribeCaloricPlanButton}
						containerStyle={styles.buttonContainer}
					>
						Dar de baja plan calórico
					</MainButton>
				)}
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
	buttonsContainer: {
		flex: 1,
		justifyContent: "center",
	},
	buttonContainer: {
		marginVertical: 10,
	},
	unsubscribeCaloricPlanButton: {
		backgroundColor: "red",
	},
});
