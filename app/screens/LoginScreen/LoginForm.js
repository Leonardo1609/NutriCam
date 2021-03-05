import React from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { InputForm } from "../../components/InputForm";
import { useForm } from "../../hooks/useForm";
import { loginValidation } from "../../validations/loginValidation";
import { MainButton } from "../../components/MainButton";
import { ErrorText } from "../../components/ErrorText";
import { useDispatch } from 'react-redux';
import { startLoginUser } from '../../actions/authActions';

export const LoginForm = () => {

	const dispatch = useDispatch();

	const initialValues = {
		email: "leonardo@gmail.com",
		password: "123456",
	};

	const { formValues, errors, handleChange, handleSubmit } = useForm(
		initialValues,
		loginValidation,
		loginSubmit
	);

	const { email, password } = formValues;

	function loginSubmit() {
		dispatch( startLoginUser( email, password ) );
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<InputForm
					label="Correo"
					onChangeText={(value) => handleChange(value, "email")}
					value={email}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["email"] && styles.errorInput}
				/>
				{errors["email"] && <ErrorText>{errors.email}</ErrorText>}
				<InputForm
					label="Contraseña"
					onChangeText={(value) => handleChange(value, "password")}
					value={password}
					autoCapitalize="none"
					secureTextEntry={true}
					containerStyle={styles.inputContainer}
					inputStyle={errors["password"] && styles.errorInput}
				/>
				{errors["password"] && <ErrorText>{errors.password}</ErrorText>}
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={handleSubmit}
				>
					Siguiente
				</MainButton>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: "10%",
	},
	inputContainer: {
		marginVertical: 10,
	},
	buttonContainer: {
		marginVertical: 40,
	},
	errorInput: {
		borderBottomColor: "red",
	},
});
