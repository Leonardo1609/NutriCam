import React from "react";
import {
	Keyboard,
	StyleSheet,
	View,
	TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ErrorText } from "../../components/ErrorText";
import { InputForm } from "../../components/InputForm";
import { MainButton } from "../../components/MainButton";
import { useForm } from "../../hooks/useForm";
import { sendEmailValidation } from "../../validations/sendEmailValidation";
import { startSendEmailToRestorePassword } from "../../actions/restorePasswordProcessActions";
import { useNavigation } from "@react-navigation/native";
import { setMessageWarning } from "../../actions/uiActions";

export const SendEmailToRestorePasswordScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { messageWarning } = useSelector((state) => state.ui);
	const initialValues = {
		email: "",
	};

	const { formValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		sendEmailValidation,
		sendEmail
	);

	const { email } = formValues;

	const gotToRecoveryCodeScreen = () => {
		navigation.navigate("RecoveryCode");
	};

	function sendEmail() {
		dispatch(
			startSendEmailToRestorePassword(email, gotToRecoveryCodeScreen)
		);
	}

	const handleEmail = (value) => {
		dispatch(setMessageWarning(null));
		handleChange(value, "email");
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<InputForm
					label="Correo"
					inputStyle={errors["email"] && styles.errorInput}
					onChangeText={handleEmail}
					value={email}
				/>
				<ErrorText>{errors["email"]}</ErrorText>
				{messageWarning && <ErrorText>{messageWarning}</ErrorText>}
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={handleSubmit}
				>
					Enviar
				</MainButton>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "white",
		paddingHorizontal: "10%",
		flex: 1,
		justifyContent: "center",
	},
	buttonContainer: {
		marginVertical: 20,
	},
	errorInput: {
		borderBottomColor: "red",
	},
});
