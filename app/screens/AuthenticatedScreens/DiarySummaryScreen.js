import React, { useState, useEffect } from "react";
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
			<Text>
				Calorías Consumidas (kcal): {nutritionSummary?.total_calories}
			</Text>
			<Text>
				Grasas Totales (g): {nutritionSummary?.total_carbohydrates}
			</Text>
			<Text>
				Carbohidratos Totales (g): {nutritionSummary?.total_fats}
			</Text>
			<Text>Proteínas (g): {nutritionSummary?.total_proteins}</Text>
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
});
