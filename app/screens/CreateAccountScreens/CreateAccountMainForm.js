import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../../actions/authActions";
import { setMessageWarning } from "../../actions/uiActions";

export const CreateAccountMainForm = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { messageWarning } = useSelector((state) => state.ui);

	const initialValues = {
		username: "usuario prueba",
		email: "usuarioprueba1@gmail.com",
		password: "12345678",
		confirmPassword: "12345678",
	};

	const { formValues, errors, handleChange, handleSubmit, reset } = useForm(
		initialValues,
		createAccountValidation,
		submitForm
	);

	const { username, email, password, confirmPassword } = formValues;

	const submitIfUserDoesntExists = () => {
		dispatch(setBasicData(username, email, password));
		navigation.navigate("AskForCaloricPlan");
		reset({ ...formValues, password: "", confirmPassword: "" });
	};

	function submitForm() {
		dispatch(userExists(username, email, submitIfUserDoesntExists));
	}

	useEffect(() => {
		dispatch(setMessageWarning(null));
	}, [email]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			dispatch(setMessageWarning(null));
		});

		return () => unsubscribe();
	}, []);

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
				{messageWarning && <ErrorText>{messageWarning}</ErrorText>}
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
