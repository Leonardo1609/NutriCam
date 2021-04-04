import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { startChangePassword } from "../../../actions/authActions";
import { changePasswordValidation } from "../../../validations/changePasswordValidation";
import { InputForm } from "../../../components/InputForm";
import { MainButton } from "../../../components/MainButton";
import { ErrorText } from "../../../components/ErrorText";
import { useForm } from "../../../hooks/useForm";

export const ChangePasswordFormScreen = () => {
	const initialValues = {
		currenPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	};

	const dispatch = useDispatch();
	const { messageWarning } = useSelector((state) => state.ui);

	const { formValues, errors, handleChange, handleSubmit } = useForm(
		initialValues,
		changePasswordValidation,
		changePasswordSubmit
	);

	const { currentPassword, newPassword, confirmNewPassword } = formValues;

	function changePasswordSubmit() {
		dispatch(startChangePassword(currentPassword, newPassword));
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<InputForm
					label="Contraseña Actual"
					onChangeText={(value) =>
						handleChange(value, "currentPassword")
					}
					secureTextEntry={true}
					value={currentPassword}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["currentPassword"] && styles.errorInput}
				/>
				{errors["currentPassword"] && (
					<ErrorText>{errors.currentPassword}</ErrorText>
				)}
				<InputForm
					label="Nueva Contraseña"
					onChangeText={(value) => handleChange(value, "newPassword")}
					secureTextEntry={true}
					value={newPassword}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["newPassword"] && styles.errorInput}
				/>
				{errors["newPassword"] && (
					<ErrorText>{errors.newPassword}</ErrorText>
				)}

				<InputForm
					label="Repetir Nueva Contraseña"
					onChangeText={(value) =>
						handleChange(value, "confirmNewPassword")
					}
					value={confirmNewPassword}
					secureTextEntry={true}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={
						errors["confirmNewPassword"] && styles.errorInput
					}
				/>
				{errors["confirmNewPassword"] && (
					<ErrorText>{errors.confirmNewPassword}</ErrorText>
				)}
				{messageWarning && <ErrorText>{messageWarning}</ErrorText>}
				<MainButton
					onPress={handleSubmit}
					containerStyle={styles.buttonContainer}
				>
					Guardar
				</MainButton>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
		justifyContent: "center",
	},
	inputContainer: {
		marginVertical: 10,
	},
	errorInput: {
		borderBottomColor: "red",
	},
	buttonContainer: {
		marginVertical: 20,
	},
});
