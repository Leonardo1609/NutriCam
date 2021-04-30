import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { MainButton } from "../../../../components/MainButton";
import {
	setDateOfUserSummary,
	startGetUserSummaryPerDay,
} from "../../../../actions/administratorSpecificUserActions";
import { formatDate, parserDateToLocale } from "../../../../helpers/helpers";
import { useNavigation } from "@react-navigation/native";

import moment from "moment";
import "moment/locale/es";
import { colors } from "../../../../consts/colors";
moment.locale("es");

export const UserNutritionSummaryScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { userPrivateInformation } = useSelector(
		(state) => state.administrator
	);
	const { dateOfUserSummary, nutritionUserSummary } = useSelector(
		(state) => state.administratorSpecificUser
	);

	const [summaryDayToShow, setSummaryDayToShow] = useState(
		moment(new Date()).format("L")
	);
	const [summaryDay, setSummaryDay] = useState(new Date());
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setSummaryDay(date);
		dispatch(setDateOfUserSummary(formatDate(date)));
		setSummaryDayToShow(moment(date).format("L"));
	};

	const goBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		dispatch(startGetUserSummaryPerDay());
	}, [dateOfUserSummary]);

	return (
		<View style={styles.screen}>
			{userPrivateInformation && (
				<>
					<View style={styles.dateContainer}>
						<View>
							<TouchableNativeFeedback
								onPress={setShowDateTimePicker.bind(this, true)}
							>
								<View style={styles.dateButtonContainer}>
									<Ionicons
										name="ios-calendar-outline"
										size={20}
									/>
									<Text style={styles.dateText}>
										{summaryDayToShow}
									</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						<DateTimePickerModal
							mode="date"
							date={summaryDay}
							minimumDate={parserDateToLocale(
								userPrivateInformation.user?.created_at
							)}
							maximumDate={new Date()}
							isVisible={showDateTimePicker}
							onConfirm={confirmDate}
							onCancel={setShowDateTimePicker.bind(this, false)}
							locale="es_ES"
							headerTextIOS="Elige tu fecha de nacimiento"
						/>
					</View>
					<View style={styles.nutritionInformationContainer}>
						<Text style={styles.caloricPlanText}>
							Plan Calórico:{" "}
							{
								userPrivateInformation.profile
									.profile_caloric_plan
							}
						</Text>
						<Text style={styles.nutritionText}>
							Calorías Consumidas (kcal):{" "}
							<Text style={styles.nutritionTextBold}>
								{nutritionUserSummary?.total_calories}
							</Text>
						</Text>
						<Text style={styles.nutritionText}>
							Grasas Totales (g):{" "}
							<Text style={styles.nutritionTextBold}>
								{nutritionUserSummary?.total_carbohydrates}
							</Text>
						</Text>
						<Text style={styles.nutritionText}>
							Carbohidratos Totales (g):{" "}
							<Text style={styles.nutritionTextBold}>
								{nutritionUserSummary?.total_fats}
							</Text>
						</Text>
						<Text style={styles.nutritionText}>
							Proteínas (g):{" "}
							<Text style={styles.nutritionTextBold}>
								{nutritionUserSummary?.total_proteins}
							</Text>
						</Text>
					</View>
				</>
			)}
			<MainButton onPress={goBack}>Volver</MainButton>
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
	caloricPlanText: {
		fontSize: 18,
		color: colors.green,
		fontWeight: "bold",
		marginBottom: 5,
	},
});
