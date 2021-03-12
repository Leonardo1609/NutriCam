import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableNativeFeedback,
	AsyncStorage,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CalorieBar } from "../../components/CalorieBar";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/es";
import { DayFood } from "../../components/DayFood";
import { startGetFoodRegisters } from "../../actions/nutritionSummaryActions";
moment.locale("es");

export const HomeScreen = () => {
	const dispatch = useDispatch();
	const [registerDayToShow, setRegisterDayToShow] = useState(
		moment(new Date()).format("L")
	);

	const filterFoodsPerDayFoodId = (foods, filterId) => {
		return foods.filter((food) => food.day_food_id === filterId);
	};

	const totalCaloriesConsumedPerDayFood = (foods) => {
		const reducer = (acc, cur) => acc + cur.calories;

		if (foods.length) {
			return foods.reduce(reducer, 0);
		}

		return 0;
	};

	const { userInformation } = useSelector((state) => state.auth);

	const { foodRegisters } = useSelector((state) => state.nutritionSummary);

	const caloriesRecommendationsPerDayFood = userInformation?.profile
		?.profile_nutritional_plan
		? [
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.2),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.1),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.35),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.1),
				Math.ceil(userInformation.profile.profile_caloric_plan * 0.25),
		  ]
		: [];

	const [registerDayToSend, setRegisterDayToSend] = useState(
		JSON.stringify(new Date()).slice(1, 11)
	);
	const [registerDay, setRegisterDay] = useState(new Date());

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setRegisterDay(date);
		setRegisterDayToSend(JSON.stringify(date).slice(1, 11));
		setRegisterDayToShow(moment(date).format("L"));
	};

	useEffect(() => {
		dispatch(startGetFoodRegisters(registerDayToSend));
	}, [registerDayToSend]);

	return (
		<View style={styles.screen}>
			{userInformation && (
				<>
					<View style={styles.dateContainer}>
						<View>
							<TouchableNativeFeedback
								onPress={setShowDateTimePicker.bind(this, true)}
							>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
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
									Date.parse(userInformation.user.created_at)
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
					<View style={{ marginVertical: 10 }}>
						<CalorieBar />
					</View>
					<ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Desayuno"
								recommended={
									caloriesRecommendationsPerDayFood[0]
								}
								dayId={1}
								data={filterFoodsPerDayFoodId(foodRegisters, 1)}
								total={totalCaloriesConsumedPerDayFood(
									filterFoodsPerDayFoodId(foodRegisters, 1)
								)}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Media Mañana"
								recommended={
									caloriesRecommendationsPerDayFood[1]
								}
								dayId={2}
								data={filterFoodsPerDayFoodId(foodRegisters, 2)}
								total={totalCaloriesConsumedPerDayFood(
									filterFoodsPerDayFoodId(foodRegisters, 2)
								)}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Almuerzo"
								recommended={
									caloriesRecommendationsPerDayFood[2]
								}
								dayId={3}
								data={filterFoodsPerDayFoodId(foodRegisters, 3)}
								total={totalCaloriesConsumedPerDayFood(
									filterFoodsPerDayFoodId(foodRegisters, 3)
								)}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Media Tarde"
								recommended={
									caloriesRecommendationsPerDayFood[3]
								}
								dayId={4}
								data={filterFoodsPerDayFoodId(foodRegisters, 4)}
								total={totalCaloriesConsumedPerDayFood(
									filterFoodsPerDayFoodId(foodRegisters, 4)
								)}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Noche"
								recommended={
									caloriesRecommendationsPerDayFood[4]
								}
								dayId={5}
								data={filterFoodsPerDayFoodId(foodRegisters, 5)}
								total={totalCaloriesConsumedPerDayFood(
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
		paddingHorizontal: "10%",
		backgroundColor: "white",
	},
	dateText: {
		fontSize: 20,
		marginLeft: 10,
	},
	dateContainer: {
		marginTop: 5,
	},
});
