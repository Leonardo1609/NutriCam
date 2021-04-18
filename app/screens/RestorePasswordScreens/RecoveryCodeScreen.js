import React, { useEffect } from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { ErrorText } from "../../components/ErrorText";
import { InputForm } from "../../components/InputForm";
import { useForm } from "../../hooks/useForm";
import { MainButton } from "../../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { startSendRecoveryCode } from "../../actions/restorePasswordProcessActions";
import { useNavigation } from "@react-navigation/native";
import { AlertMessage } from "../../components/AlertMessage";
import { setMessageWarning } from "../../actions/uiActions";

const recoveryCode = ({ code }) => {
	let errors = {};
	if (!code) {
		errors["code"] = "El código es requerido";
	}
	return errors;
};

export const RecoveryCodeScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const initialValues = {
		code: "",
	};

	const { email } = useSelector((state) => state.restorePasswordProcess);
	const { messageSuccess, messageWarning } = useSelector((state) => state.ui);

	const { formValues, handleChange, handleSubmit, errors } = useForm(
		initialValues,
		recoveryCode,
		submitRecoveryCode
	);

	const { code } = formValues;

	const goToRestorePassword = () => {
		navigation.navigate("RestorePassword");
	};

	function submitRecoveryCode() {
		dispatch(startSendRecoveryCode(email, code, goToRestorePassword));
	}

	if (!email) {
		return navigation.navigate("SendEmailToRestorePassword");
	}

	const handleCode = (value) => {
		dispatch(setMessageWarning(null));
		handleChange(value, "code");
	};

	useEffect(() => {
		return () => {
			dispatch(setMessageWarning(null));
		};
	}, []);

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
						label="Código"
						inputStyle={errors["code"] && styles.errorInput}
						onChangeText={handleCode}
						value={code}
					/>
					<ErrorText>{errors["code"]}</ErrorText>
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
