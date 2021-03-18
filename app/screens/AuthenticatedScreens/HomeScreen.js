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
import { formatDate } from "../../helpers/helpers";
import { CalorieBar } from "../../components/CalorieBar";
import { Ionicons } from "@expo/vector-icons";
import { totalCaloriesConsumed } from "../../helpers/helpers";
import { DayFood } from "../../components/DayFood";
import { startGetFoodRegisters } from "../../actions/nutritionSummaryActions";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const HomeScreen = () => {
	const dispatch = useDispatch();

	const { userInformation } = useSelector((state) => state.auth);
	const { foodRegisters } = useSelector((state) => state.nutritionSummary);

	const [registerDayToShow, setRegisterDayToShow] = useState(
		moment(new Date()).format("L")
	);

	const [registerDayToSend, setRegisterDayToSend] = useState(
		formatDate(new Date())
	);

	const [registerDay, setRegisterDay] = useState(new Date());

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const filterFoodsPerDayFoodId = (foods, filterId) => {
		return foods.filter((food) => food.day_food_id === filterId);
	};

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

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setRegisterDay(date);
		setRegisterDayToSend(formatDate(date));
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
					<View style={styles.row}>
						<CalorieBar />
					</View>
					<ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
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
	row: {
		marginVertical: 10,
	},
});
