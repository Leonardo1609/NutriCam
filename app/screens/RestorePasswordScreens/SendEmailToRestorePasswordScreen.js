import React, { useEffect } from "react";
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
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../../consts/colors";

export const SendEmailToRestorePasswordScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { messageWarning, loadingSendingMessage } = useSelector(
		(state) => state.ui
	);

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

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			dispatch(setMessageWarning(null));
		});

		return () => unsubscribe();
	}, []);

	const handleEmail = (value) => {
		dispatch(setMessageWarning(null));
		handleChange(value, "email");
	};

	return (
		<>
			<Spinner
				visible={loadingSendingMessage}
				textContent="Enviando Correo..."
				textStyle={styles.loadingText}
				color={colors.green}
				overlayColor="rgba(0,0,0, 0.6)"
			/>
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
	buttonContainer: {
		marginVertical: 20,
	},
	errorInput: {
		borderBottomColor: "red",
	},
	loadingText: {
		color: colors.green,
		fontSize: 30,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
});
