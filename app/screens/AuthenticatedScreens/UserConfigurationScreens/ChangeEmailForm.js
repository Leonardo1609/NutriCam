import React from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { startChangeEmail } from "../../../actions/authActions";
import { InputForm } from "../../../components/InputForm";
import { ErrorText } from "../../../components/ErrorText";
import { MainButton } from "../../../components/MainButton";
import { changeEmailValidation } from "../../../validations/changeEmailValidation";
import { useForm } from "../../../hooks/useForm";
import { useNavigation } from "@react-navigation/native";

export const ChangeEmailForm = () => {
	const initialValues = {
		currentEmail: "",
		newEmail: "",
		password: "",
	};

	const dispatch = useDispatch();
	const { messageWarning } = useSelector((state) => state.ui);

	const { formValues, errors, handleChange, handleSubmit } = useForm(
		initialValues,
		changeEmailValidation,
		changeEmailSubmit
	);

	const { currentEmail, newEmail, password } = formValues;

	function changeEmailSubmit() {
		dispatch(startChangeEmail(currentEmail, newEmail, password));
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<InputForm
					label="Correo Actual"
					onChangeText={(value) =>
						handleChange(value, "currentEmail")
					}
					value={currentEmail}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["currentEmail"] && styles.errorInput}
				/>
				{errors["currentEmail"] && (
					<ErrorText>{errors.currentEmail}</ErrorText>
				)}
				<InputForm
					label="Nuevo Correo"
					onChangeText={(value) => handleChange(value, "newEmail")}
					value={newEmail}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["newEmail"] && styles.errorInput}
				/>
				{errors["newEmail"] && <ErrorText>{errors.newEmail}</ErrorText>}
				<InputForm
					label="Contraseña"
					onChangeText={(value) => handleChange(value, "password")}
					value={password}
					secureTextEntry={true}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["password"] && styles.errorInput}
				/>
				{errors["password"] && <ErrorText>{errors.password}</ErrorText>}
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
