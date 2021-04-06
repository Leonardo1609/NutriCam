import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { MainButton } from "../../components/MainButton";
import {
	setDateOfRegisters,
	setDateOfSummary,
	startGetNutritionSummary,
} from "../../actions/nutritionSummaryActions";
import { Ionicons } from "@expo/vector-icons";
import { formatDate, parserDateToLocale } from "../../helpers/helpers";
import { setTargetMessage } from "../../helpers/helpers";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { useNavigation } from "@react-navigation/native";

export const DiarySummaryScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);

	const { dateOfSummary, nutritionSummary } = useSelector(
		(state) => state.nutritionSummary
	);

	const [summaryDayToShow, setSummaryDayToShow] = useState(
		moment(new Date()).format("L")
	);

	const [summaryDay, setSummaryDay] = useState(new Date());

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setSummaryDay(date);
		dispatch(setDateOfSummary(formatDate(date)));
		setSummaryDayToShow(moment(date).format("L"));
	};

	const getTargetMessage = () => {
		if (
			nutritionSummary?.total_calories /
				userInformation?.profile?.profile_caloric_plan <
			0.8
		) {
			return setTargetMessage("unfulfilled");
		} else if (
			nutritionSummary?.total_calories /
				userInformation?.profile?.profile_caloric_plan >
			1.2
		) {
			return setTargetMessage("exceded");
		} else {
			return setTargetMessage("success");
		}
	};

	useEffect(() => {
		setSummaryDay(parserDateToLocale(dateOfSummary));

		setSummaryDayToShow(
			moment(parserDateToLocale(dateOfSummary)).format("L")
		);

		dispatch(startGetNutritionSummary());
	}, [dateOfSummary]);

	return (
		<View style={styles.screen}>
			<View style={styles.dateContainer}>
				<View>
					<TouchableNativeFeedback
						onPress={setShowDateTimePicker.bind(this, true)}
					>
						<View style={styles.dateButtonContainer}>
							<Ionicons name="ios-calendar-outline" size={20} />
							<Text style={styles.dateText}>
								{summaryDayToShow}
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<DateTimePickerModal
					mode="date"
					date={summaryDay}
					minimumDate={
						new Date(Date.parse(userInformation.user.created_at))
					}
					maximumDate={new Date()}
					isVisible={showDateTimePicker}
					onConfirm={confirmDate}
					onCancel={setShowDateTimePicker.bind(this, false)}
					locale="es_ES"
					headerTextIOS="Elige tu fecha de nacimiento"
				/>
			</View>
			<View style={styles.nutritionInformationContainer}>
				<Text style={styles.nutritionText}>
					Calorías Consumidas (kcal):{" "}
					<Text style={styles.nutritionTextBold}>
						{nutritionSummary?.total_calories}
					</Text>
				</Text>
				<Text style={styles.nutritionText}>
					Grasas Totales (g):{" "}
					<Text style={styles.nutritionTextBold}>
						{nutritionSummary?.total_carbohydrates}
					</Text>
				</Text>
				<Text style={styles.nutritionText}>
					Carbohidratos Totales (g):{" "}
					<Text style={styles.nutritionTextBold}>
						{nutritionSummary?.total_fats}
					</Text>
				</Text>
				<Text style={styles.nutritionText}>
					Proteínas (g):{" "}
					<Text style={styles.nutritionTextBold}>
						{nutritionSummary?.total_proteins}
					</Text>
				</Text>
			</View>
			{parserDateToLocale(
				userInformation?.profile?.profile_initial_date_caloric_plan
			) <= parserDateToLocale(dateOfSummary) && (
				<View style={styles.targetMessageContainer}>
					<Text
						style={{
							...styles.targetMessage,
							color: getTargetMessage().color,
						}}
					>
						{getTargetMessage().message}
					</Text>
				</View>
			)}
			<MainButton
				onPress={() => {
					navigation.navigate("Diario");
					dispatch(setDateOfRegisters(dateOfSummary));
				}}
			>
				Ver Registros
			</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	dateButtonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	dateText: {
		fontSize: 20,
		marginLeft: 10,
	},
	dateContainer: {
		marginTop: 5,
	},
	nutritionInformationContainer: {
		marginVertical: 30,
	},
	nutritionText: {
		fontSize: 16,
		marginVertical: 5,
	},
	nutritionTextBold: {
		fontWeight: "bold",
	},
	targetMessageContainer: {
		marginBottom: 30,
	},
	targetMessage: {
		fontFamily: "poppins-bold",
		fontSize: 16,
		textAlign: "center",
	},
});
