import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	TextInput,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PickerSelect from "react-native-picker-select";
import { colors } from "../consts/colors";
import { MainButton } from "./MainButton";
import { userDataValidation } from "../validations/userDataValidation";
import { useSelector } from "react-redux";
import { ErrorText } from "./ErrorText";
import {
	activityLevels,
	formatDate,
	genres,
	parserDateToLocale,
} from "../helpers/helpers";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const errorColor = (error) => (error ? "red" : "black");

export const EnterUserDataForm = ({ submitFn, buttonText, ...props }) => {
	const { userInformation } = useSelector((state) => state.auth);

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [birthdayToShow, setBirthdayToShow] = useState("");
	const [birthdayToSave, setBirthdayToSave] = useState("");
	const [birthdayToPicker, setBirthdayToPicker] = useState(new Date());
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

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		// setBirthdayToSave(JSON.stringify(date).slice(1, 11));
		setBirthdayToSave(formatDate(date));
		setBirthdayToShow(moment(date).format("L"));
		setBirthdayToPicker(date);
	};

	const setMinDateTo18YearsOld = () => {
		const d = new Date();
		d.setFullYear(d.getFullYear() - 18);
		return d;
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
			submitFn(
				birthdayToSave,
				height,
				genre,
				actualWeight,
				activityLevel
			);
		}
	}, [errors, formSubmit]);

	useEffect(() => {
		if (userInformation?.profile?.profile_have_caloric_plan) {
			const birthdate = parserDateToLocale(
				userInformation.profile.profile_birthdate
			);

			setHeight(userInformation.profile.profile_height);
			setActivityLevel(userInformation.profile.profile_activity_level);
			setGenre(userInformation.profile.profile_genre);
			setActualWeight(userInformation.profile.profile_actual_weight);
			setBirthdayToSave(JSON.stringify(birthdate).slice(1, 11));
			setBirthdayToShow(moment(birthdate).format("L"));
			setBirthdayToPicker(birthdate);
		}
	}, [userInformation]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<ScrollView>
				<View style={styles.screen}>
					<View style={styles.formContainer}>
						<View style={styles.row}>
							<View style={styles.labelContainer}>
								<Text
									style={{
										...styles.label,
										color: errorColor(
											errors["birthdayToShow"]
										),
									}}
								>
									F. de Nacimiento*
								</Text>
							</View>
							<View style={styles.inputContainer}>
								<TouchableNativeFeedback
									onPress={setShowDateTimePicker.bind(
										this,
										true
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
								date={birthdayToPicker}
								maximumDate={setMinDateTo18YearsOld()}
								isVisible={showDateTimePicker}
								onConfirm={confirmDate}
								onCancel={setShowDateTimePicker.bind(
									this,
									false
								)}
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
									maxLength={3}
									style={{
										...styles.input,
										borderBottomColor: errorColor(
											errors["height"]
										),
									}}
									value={height ? height.toString() : ""}
									onChangeText={handleHeight}
									placeholderTextColor={
										colors.grayPlaceholder
									}
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
									items={[...genres.keys()].map(
										(genreKey) => ({
											label: genres.get(genreKey),
											value: genreKey,
										})
									)}
								/>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.labelContainer}>
								<Text
									style={{
										...styles.label,
										color: errorColor(
											errors["actualWeight"]
										),
									}}
								>
									Peso Actual*
								</Text>
							</View>
							<View style={styles.inputContainer}>
								<TextInput
									maxLength={4}
									style={{
										...styles.input,
										borderBottomColor: errorColor(
											errors["actualWeight"]
										),
									}}
									placeholderTextColor={
										colors.grayPlaceholder
									}
									value={
										actualWeight
											? actualWeight.toString()
											: ""
									}
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
											label: activityLevels.get(
												actLvlKey
											),
											value: actLvlKey,
										})
									)}
								/>
							</View>
						</View>
					</View>
					{Object.keys(errors).length > 0 && (
						<View style={styles.errorContainer}>
							<ErrorText>Complete los datos faltantes</ErrorText>
						</View>
					)}
					<View style={styles.childrenContainer}>
						{props.children}
					</View>
					<MainButton
						containerStyle={styles.buttonContainer}
						onPress={submit}
					>
						{buttonText}
					</MainButton>
				</View>
			</ScrollView>
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
		marginTop: Dimensions.get("window").height > 600 ? 50 : 20,
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
		fontSize: Dimensions.get("window").width > 350 ? 16 : 14,
	},
	inputContainer: {
		flex: 1,
	},
	placeholder: {
		color: colors.grayPlaceholder,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
	indications: {
		fontSize: Dimensions.get("window").width > 350 ? 16 : 12,
		fontFamily: "poppins",
	},
	selected: {
		color: "black",
	},
	childrenContainer: {
		marginVertical: Dimensions.get("window").height > 600 ? 10 : 8,
	},
	buttonContainer: {
		width: "100%",
		marginTop: Dimensions.get("window").height > 600 ? 10 : 0,
		marginBottom: 20,
	},
	errorContainer: {
		marginVertical: 8,
	},
});
