import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AlertMessage } from "../../components/AlertMessage";
import { formatDate, parserDateToLocale } from "../../helpers/helpers";
import { CalorieBar } from "../../components/CalorieBar";
import { Ionicons } from "@expo/vector-icons";
import { totalCaloriesConsumed } from "../../helpers/helpers";
import { DayFood } from "../../components/DayFood";
import {
	startGetFoodRegisters,
	setDateOfRegisters,
} from "../../actions/nutritionSummaryActions";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const { userInformation } = useSelector((state) => state.auth);
	const { messageWarning } = useSelector((state) => state.ui);
	const { foodRegisters, dateOfRegister } = useSelector(
		(state) => state.nutritionSummary
	);

	const [registerDayToShow, setRegisterDayToShow] = useState(
		moment(new Date()).format("L")
	);

	const [registerDay, setRegisterDay] = useState(new Date());

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const filterFoodsPerDayFoodId = (foods = [], filterId) => {

		return foods.filter((food) => food.day_food_id === filterId);
	};

	const caloriesRecommendationsPerDayFood = userInformation?.profile
		?.profile_have_caloric_plan
		? [
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.2),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.1),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.35),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.1),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.25),
		  ]
		: [];

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setRegisterDay(date);
		dispatch(setDateOfRegisters(formatDate(date)));
		setRegisterDayToShow(moment(date).format("L"));
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			setRegisterDay(new Date());
			setRegisterDayToShow(moment(new Date()).format("L"));
			dispatch(setDateOfRegisters(formatDate(new Date())));
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		setRegisterDay(parserDateToLocale(dateOfRegister));
		setRegisterDayToShow(
			moment(parserDateToLocale(dateOfRegister)).format("L")
		);
		if (userInformation?.user) {
			dispatch(startGetFoodRegisters());
		}
	}, [dateOfRegister, userInformation]);

	return (
		<View style={styles.screen}>
			{messageWarning && (
				<AlertMessage type="warning" message={messageWarning} />
			)}
			{userInformation && (
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
										{registerDayToShow}
									</Text>
								</View>
							</TouchableNativeFeedback>
						</View>
						<DateTimePickerModal
							mode="date"
							date={registerDay}
							minimumDate={
								new Date(
									Date.parse(
										userInformation?.user?.created_at
									)
								)
							}
							maximumDate={new Date()}
							isVisible={showDateTimePicker}
							onConfirm={confirmDate}
							onCancel={setShowDateTimePicker.bind(this, false)}
							locale="es_ES"
							headerTextIOS="Elige tu fecha de nacimiento"
						/>
					</View>
					<View style={styles.row}>
						<CalorieBar />
					</View>
					<ScrollView>
						<View style={styles.row}>
							<DayFood
								title="Desayuno"
								recommended={
									caloriesRecommendationsPerDayFood[0]
								}
								dayId={1}
								data={filterFoodsPerDayFoodId(foodRegisters, 1)}
								total={totalCaloriesConsumed(
									filterFoodsPerDayFoodId(foodRegisters, 1)
								)}
							/>
						</View>
						<View style={styles.row}>
							<DayFood
								title="Media Mañana"
								recommended={
									caloriesRecommendationsPerDayFood[1]
								}
								dayId={2}
								data={filterFoodsPerDayFoodId(foodRegisters, 2)}
								total={totalCaloriesConsumed(
									filterFoodsPerDayFoodId(foodRegisters, 2)
								)}
							/>
						</View>
						<View style={styles.row}>
							<DayFood
								title="Almuerzo"
								recommended={
									caloriesRecommendationsPerDayFood[2]
								}
								dayId={3}
								data={filterFoodsPerDayFoodId(foodRegisters, 3)}
								total={totalCaloriesConsumed(
									filterFoodsPerDayFoodId(foodRegisters, 3)
								)}
							/>
						</View>
						<View style={styles.row}>
							<DayFood
								title="Media Tarde"
								recommended={
									caloriesRecommendationsPerDayFood[3]
								}
								dayId={4}
								data={filterFoodsPerDayFoodId(foodRegisters, 4)}
								total={totalCaloriesConsumed(
									filterFoodsPerDayFoodId(foodRegisters, 4)
								)}
							/>
						</View>
						<View style={styles.row}>
							<DayFood
								title="Noche"
								recommended={
									caloriesRecommendationsPerDayFood[4]
								}
								dayId={5}
								data={filterFoodsPerDayFoodId(foodRegisters, 5)}
								total={totalCaloriesConsumed(
									filterFoodsPerDayFoodId(foodRegisters, 5)
								)}
							/>
						</View>
					</ScrollView>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: "10%",
		backgroundColor: "white",
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
	row: {
		marginVertical: 10,
	},
});
