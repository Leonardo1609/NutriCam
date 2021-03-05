import React from "react";
import {
	StyleSheet,
	View,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { ErrorText } from "../../components/ErrorText";
import { InputForm } from "../../components/InputForm";
import { MainButton } from "../../components/MainButton";
import { useForm } from "../../hooks/useForm";
import { createAccountValidation } from "../../validations/createAccountValidation";
import { useNavigation } from "@react-navigation/native";
import { setBasicData } from "../../actions/createAccountProcessActions";
import { useDispatch } from "react-redux";

export const CreateAccountMainForm = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const initialValues = {
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	// const initialValues = {
	// 	username: "leonardo",
	// 	email: "leonardo@gmail.com",
	// 	password: "123456",
	// 	confirmPassword: "123456",
	// };
	const { formValues, errors, handleChange, handleSubmit, reset } = useForm(
		initialValues,
		createAccountValidation,
		submitForm
	);

	const { username, email, password, confirmPassword } = formValues;

	function submitForm() {
		dispatch( setBasicData( username, email, password ) );
		navigation.navigate("AskForNutritionalPlan");
		reset({ ...formValues, password: "", confirmPassword: "" });
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<InputForm
					label="Nombre de Usuario"
					onChangeText={(value) => handleChange(value, "username")}
					value={username}
					autoCapitalize="none"
					containerStyle={styles.inputContainer}
					inputStyle={errors["username"] && styles.errorInput}
				/>
				{errors["username"] && <ErrorText>{errors.username}</ErrorText>}
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
				<InputForm
					label="Confirmar contraseña"
					onChangeText={(value) =>
						handleChange(value, "confirmPassword")
					}
					value={confirmPassword}
					autoCapitalize="none"
					secureTextEntry={true}
					containerStyle={styles.inputContainer}
					inputStyle={errors["confirmPassword"] && styles.errorInput}
				/>
				{errors["confirmPassword"] && (
					<ErrorText>{errors.confirmPassword}</ErrorText>
				)}
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
