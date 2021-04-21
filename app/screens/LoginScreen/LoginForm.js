import React from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Text,
	Keyboard,
} from "react-native";
import { InputForm } from "../../components/InputForm";
import { useForm } from "../../hooks/useForm";
import { loginValidation } from "../../validations/loginValidation";
import { MainButton } from "../../components/MainButton";
import { ErrorText } from "../../components/ErrorText";
import { useDispatch, useSelector } from "react-redux";
import { startLoginUser } from "../../actions/authActions";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { messageWarning } = useSelector((state) => state.ui);

	const initialValues = {
		email: "leonardocornejoruiz@gmail.com",
		password: "12345678",
	};

	// const initialValues = {
	// 	email: "",
	// 	password: "",
	// };

	const { formValues, errors, handleChange, handleSubmit } = useForm(
		initialValues,
		loginValidation,
		loginSubmit
	);

	const { email, password } = formValues;

	function loginSubmit() {
		dispatch(startLoginUser(email, password));
	}

	const goToSendEmailToRestorePassword = () => {
		navigation.navigate("SendEmailToRestorePassword");
	};

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
				{messageWarning && <ErrorText>{messageWarning}</ErrorText>}
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={handleSubmit}
				>
					Ingresar
				</MainButton>
				<TouchableWithoutFeedback
					onPress={goToSendEmailToRestorePassword}
				>
					<Text style={styles.forgotPasswordText}>
						¿Olvidaste tu contraseña?
					</Text>
				</TouchableWithoutFeedback>
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
	forgotPasswordText: {
		color: "#3d5af1",
		fontFamily: "poppins-bold",
		fontSize: 18,
	},
});
