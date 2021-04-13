import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
	Keyboard,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startNewPassword } from "../../actions/restorePasswordProcessActions";
import { AlertMessage } from "../../components/AlertMessage";
import { InputForm } from "../../components/InputForm";
import { ErrorText } from "../../components/ErrorText";
import { MainButton } from "../../components/MainButton";
import { newPasswordValidation } from "../../validations/newPasswordValidation";

export const RestorePasswordScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const initialValues = {
		newPassword: "",
		confirmNewPassword: "",
	};

	const { email } = useSelector((state) => state.restorePasswordProcess);
	const { messageSuccess } = useSelector((state) => state.ui);

	const { formValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		newPasswordValidation,
		submitNewPassword
	);

	const { newPassword, confirmNewPassword } = formValues;

	const goToLogin = () => {
		navigation.navigate("FirstScreen");
	};

	function submitNewPassword() {
		dispatch(startNewPassword(email, newPassword, goToLogin));
	}

	if (!email) {
		return navigation.navigate("SendEmailToRestorePassword");
	}

	return (
		<>
			{messageSuccess && (
				<View style={styles.alertContainer}>
					<AlertMessage type="success" message={messageSuccess} />
				</View>
			)}
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.screen}>
					<InputForm
						label="Nueva Contraseña"
						inputStyle={errors["newPassword"] && styles.errorInput}
						onChangeText={(value) =>
							handleChange(value, "newPassword")
						}
						secureTextEntry={true}
						value={newPassword}
					/>
					<ErrorText>{errors["newPassword"]}</ErrorText>
					<InputForm
						label="Confirmar Contraseña"
						inputStyle={
							errors["confirmNewPassword"] && styles.errorInput
						}
						onChangeText={(value) =>
							handleChange(value, "confirmNewPassword")
						}
						secureTextEntry={true}
						value={confirmNewPassword}
					/>
					<ErrorText>{errors["confirmNewPassword"]}</ErrorText>
					<MainButton
						containerStyle={styles.buttonContainer}
						onPress={handleSubmit}
					>
						Enviar
					</MainButton>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "white",
		paddingHorizontal: "10%",
		flex: 1,
		justifyContent: "center",
	},
	alertContainer: {
		backgroundColor: "white",
		paddingHorizontal: "10%",
		alignItems: "center",
	},
	buttonContainer: {
		marginVertical: 20,
	},
	errorInput: {
		borderBottomColor: "red",
	},
});
