import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EnterUserDataForm } from "../../../components/EnterUserDataForm";
import { AlertMessage } from "../../../components/AlertMessage";
import { startUpdateProfileData } from "../../../actions/authActions";
import { changeProfileDateMessage } from "../../../consts/consts";

export const MyDataScreen = () => {
	const dispatch = useDispatch();

	const { userInformation } = useSelector((state) => state.auth);

	const { messageSuccess } = useSelector((state) => state.ui);

	const submit = (...values) => {
		Alert.alert(
			"¿Estás seguro?",
			"Una vez realizada la modificación no se podrá revertir",
			[
				{
					text: "Cancelar",
					style: "cancel",
				},
				{
					text: "Aceptar",
					onPress: () => dispatch(startUpdateProfileData(...values)),
				},
			]
		);
	};

	return (
		<>
			{messageSuccess && (
				<View style={styles.alertContainer}>
					<AlertMessage type="success" message={messageSuccess} />
				</View>
			)}
			<EnterUserDataForm submitFn={submit} buttonText="Guardar">
				{userInformation?.profile?.profile_have_caloric_plan && (
					<>
						<Text style={styles.changeProfileDataMessage}>
							{changeProfileDateMessage}
						</Text>
						<Text style={styles.actualIMC}>
							IMC Actual:{" "}
							{userInformation.profile.profile_current_imc} kg/m2
						</Text>
						<Text style={styles.actualWeightLevel}>
							Nivel de peso:{" "}
							{userInformation.profile.w_level_name}
						</Text>
					</>
				)}
			</EnterUserDataForm>
		</>
	);
};

const styles = StyleSheet.create({
	changeProfileDataMessage: {
		fontFamily: "poppins-bold",
		fontSize: 15,
		textAlign: "center",
		marginVertical: 8,
		color: "orange",
	},
	alertContainer: {
		paddingHorizontal: "8%",
		paddingVertical: 10,
		backgroundColor: "white",
	},
	actualIMC: {
		fontSize: 16,
		fontFamily: "poppins-bold",
		textAlign: "center",
		marginVertical: 10,
	},
	actualWeightLevel: {
		fontSize: 16,
		fontFamily: "poppins-bold",
		textAlign: "center",
		marginVertical: 10,
	},
});
