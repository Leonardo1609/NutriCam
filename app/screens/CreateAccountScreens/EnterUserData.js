import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Button,
	TextInput,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { indications } from "../../consts/consts";
import { colors } from "../../consts/colors";
import { MainButton } from "../../components/MainButton";
import { userDataValidation } from "../../validations/userDataValidation";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const errorColor = (error) => (error ? "red" : "black");

export const EnterUserData = () => {
	const navigation = useNavigation();

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [birthdayToShow, setBirthdayToShow] = useState("");
	const [birthdayToSave, setBirthdayToSave] = useState("");
	const [height, setHeight] = useState(0);
	const [genre, setGenre] = useState("");
	const [actualWeight, setActualWeight] = useState(0);
	const [activityLevel, setActivityLevel] = useState(0);
	const [errors, setErrors] = useState({});
	const [formSubmit, setFormSubmit] = useState(false);

	const pickerStyle = (error = null) => ({
		placeholder: {
			color: colors.grayPlaceholder,
		},
		inputAndroid: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: error ? "red" : "black",
			paddingVertical: 5,
		},
		inputIOS: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: error ? "red" : "black",
			paddingVertical: 5,
		},
	});

	const activityLevels = new Map([
		[1, "Sedentaria"],
		[2, "Ligera"],
		[3, "Moderada"],
		[4, "Intensa"],
	]);

	const genres = new Map([
		["M", "Masculino"],
		["F", "Femenino"],
	]);

	const confirmDate = (date) => {
		setBirthdayToSave(JSON.stringify(date).slice(1, 11));
		setBirthdayToShow(moment(date).format("L"));
		setShowDateTimePicker(false);
	};

	const handleHeight = (heightValue) => {
		setHeight(heightValue.replace(/[^0-9]/g, ""));
	};

	const confirmGenre = (genreSelected) => {
		setGenre(genreSelected);
	};

	const confirmActivityLevel = (actLevelSelected) => {
		setActivityLevel(actLevelSelected);
	};

	const handleWeight = (weightValue) => {
		const regWeight = /^\d*\.?\d*$/;
		if (regWeight.test(weightValue)) {
			setActualWeight(weightValue);
		}
	};

	const submit = () => {
		const values = {
			birthdayToShow,
			height,
			genre,
			actualWeight,
			activityLevel,
		};
		setErrors(userDataValidation(values));
		setFormSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(errors).length === 0 && formSubmit) {
			navigation.navigate({
				name: "Results",
			});
		}
	}, [errors, formSubmit]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.formContainer}>
					<View style={styles.row}>
						<View style={styles.labelContainer}>
							<Text
								style={{
									...styles.label,
									color: errorColor(errors["birthdayToShow"]),
								}}
							>
								F. de Nacimiento*
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<TouchableNativeFeedback
								onPress={setShowDateTimePicker.bind(
									this,
									!showDateTimePicker
								)}
							>
								<View
									style={{
										...styles.input,
										borderBottomColor: errorColor(
											errors["birthdayToShow"]
										),
									}}
								>
									<Text
										style={
											!birthdayToShow
												? styles.placeholder
												: styles.selected
										}
									>
										{birthdayToShow
											? birthdayToShow
											: "dd/mm/aaaa"}
									</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						<DateTimePickerModal
							mode="date"
							data={birthdayToShow}
							isVisible={showDateTimePicker}
							onConfirm={confirmDate}
							onCancel={setShowDateTimePicker.bind(this, false)}
							locale="es_ES"
							headerTextIOS="Elige tu fecha de nacimiento"
						/>
					</View>
					<View style={styles.row}>
						<View style={styles.labelContainer}>
							<Text
								style={{
									...styles.label,
									color: errorColor(errors["height"]),
								}}
							>
								Altura*
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={{
									...styles.input,
									borderBottomColor: errorColor(
										errors["height"]
									),
								}}
								value={height ? height : ""}
								onChangeText={handleHeight}
								placeholderTextColor={colors.grayPlaceholder}
								placeholder="En cm"
								keyboardType="number-pad"
							/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.labelContainer}>
							<Text
								style={{
									...styles.label,
									color: errorColor(errors["genre"]),
								}}
							>
								Sexo*
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<PickerSelect
								style={pickerStyle(errors["genre"])}
								placeholder={{
									label: "--Seleccionar--",
									value: null,
								}}
								value={genre}
								useNativeAndroidPickerStyle={false}
								onValueChange={confirmGenre}
								items={[...genres.keys()].map((genreKey) => ({
									label: genres.get(genreKey),
									value: genreKey,
								}))}
							/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.labelContainer}>
							<Text
								style={{
									...styles.label,
									color: errorColor(errors["actualWeight"]),
								}}
							>
								Peso Actual*
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={{
									...styles.input,
									borderBottomColor: errorColor(
										errors["actualWeight"]
									),
								}}
								placeholderTextColor={colors.grayPlaceholder}
								value={actualWeight ? actualWeight : ""}
								onChangeText={handleWeight}
								placeholder="En kg"
								keyboardType="numeric"
							/>
						</View>
					</View>
					<View style={styles.row}>
						<View style={styles.labelContainer}>
							<Text
								style={{
									...styles.label,
									color: errors["activityLevel"]
										? "red"
										: "black",
								}}
							>
								Nivel de Ac. Física*
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<PickerSelect
								placeholder={{
									label: "--Seleccionar--",
									value: null,
								}}
								style={pickerStyle(errors["activityLevel"])}
								value={activityLevel}
								useNativeAndroidPickerStyle={false}
								onValueChange={confirmActivityLevel}
								items={[...activityLevels.keys()].map(
									(actLvlKey) => ({
										label: activityLevels.get(actLvlKey),
										value: actLvlKey,
									})
								)}
							/>
						</View>
					</View>
				</View>
				<View style={styles.indicartorContainer}>
					<Text style={styles.indications}>{indications}</Text>
				</View>
					<MainButton containerStyle={styles.buttonContainer} onPress={submit}>Siguiente</MainButton>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
		paddingHorizontal: "8%",
	},
	formContainer: {
		marginTop: 50,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
	labelContainer: {
		flex: 1,
		paddingRight: 20,
	},
	label: {
		textAlign: "right",
		fontSize: 16,
	},
	inputContainer: {
		flex: 1,
	},
	placeholder: {
		color: colors.grayPlaceholder,
	},
	indications: {
		fontSize: 16,
		fontFamily: "poppins",
	},
	selected: {
		color: "black",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
	indicartorContainer: {
		marginVertical: 20,
	},
	buttonContainer: {
		width: "100%",
		marginVertical: 20,
	},
});
