import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MainButton } from "../../../../components/MainButton";
import { activityLevels } from "../../../../helpers/helpers";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const UserPrivateInformationScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { userPrivateInformation } = useSelector(
		(state) => state.administrator
	);

	const goToBack = () => {
		navigation.goBack();
	};

	const goToUserRegisters = () => {
		navigation.navigate("UserRegisters");
	};

	const goToUserSummary = () => {
		navigation.navigate("UserSummary");
	}

	return (
		<View style={styles.screen}>
			<ScrollView>
				{userPrivateInformation && (
					<View style={styles.infoContainer}>
						<Text style={styles.titleName}>
							{userPrivateInformation.user.user_name}
						</Text>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Correo: </Text>
							<Text style={styles.result}>
								{userPrivateInformation.user.user_email}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Género: </Text>
							<Text style={styles.result}>
								{userPrivateInformation.profile
									.profile_genre === "M"
									? "Masculino"
									: "Femenino"}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Altura: </Text>
							<Text style={styles.result}>
								{userPrivateInformation.profile.profile_height}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Peso actual: </Text>
							<Text style={styles.result}>
								{
									userPrivateInformation.profile
										.profile_actual_weight
								}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Peso ideal: </Text>
							<Text style={styles.result}>
								{
									userPrivateInformation.profile
										.profile_actual_weight
								}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>
								Fecha de nacimiento:{" "}
							</Text>
							<Text style={styles.result}>
								{moment(
									userPrivateInformation.profile
										.profile_birthdate
								).format("L")}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>
								Nivel de actividad física:{" "}
							</Text>
							<Text style={styles.result}>
								{activityLevels.get(
									userPrivateInformation.profile
										.profile_activity_level
								)}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>IMC previo: </Text>
							<Text style={styles.result}>
								{
									userPrivateInformation.profile
										.profile_previous_imc
								}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>IMC actual: </Text>
							<Text style={styles.result}>
								{
									userPrivateInformation.profile
										.profile_current_imc
								}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Nivel de peso: </Text>
							<Text style={styles.result}>
								{userPrivateInformation.profile.w_level_name}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.subtitle}>Plan calórico: </Text>
							<Text style={styles.result}>
								{
									userPrivateInformation.profile
										.profile_caloric_plan
								}
							</Text>
						</View>
					</View>
				)}
				<MainButton
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.buttonStyle}
					buttonTextStyle={styles.buttonTextStyle}
					onPress={goToUserRegisters}
				>
					Ver Registros
				</MainButton>
				<MainButton
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.buttonStyle}
					buttonTextStyle={styles.buttonTextStyle}
		onPress={goToUserSummary}
				>
					Ver Resumen Diario
				</MainButton>
				<MainButton
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.backButtonStyle}
					buttonTextStyle={styles.buttonTextStyle}
					onPress={goToBack}
				>
					Volver
				</MainButton>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	buttonStyle: {
		paddingVertical: 5,
	},
	backButtonStyle: {
		paddingVertical: 5,
		backgroundColor: "orange",
	},
	buttonContainer: {
		marginVertical: 5,
	},
	buttonTextStyle: {
		fontSize: 24,
	},
	infoContainer: {
		paddingVertical: 10,
	},
	titleName: {
		fontSize: 20,
		fontFamily: "poppins-bold",
		textAlign: "center",
		marginVertical: 5,
	},
	rowContainer: {
		flexDirection: "row",
		marginVertical: 2,
	},
	subtitle: {
		fontSize: 14,
		fontFamily: "poppins-bold",
	},
	result: {
		fontSize: 14,
		fontFamily: "poppins",
	},
});
