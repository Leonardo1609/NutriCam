import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DayFood } from "../../../../components/DayFood";
import { MainButton } from "../../../../components/MainButton";
import { formatDate, totalCaloriesConsumed } from "../../../../helpers/helpers";
import {
	setDateOfUserRegister,
	startGetUserRegistersPerDay,
} from "../../../../actions/administratorSpecificUserActions";

import moment from "moment";
import "moment/locale/es";
import { useNavigation } from "@react-navigation/native";
moment.locale("es");

export const UserRegistersScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [registerDayToShow, setRegisterDayToShow] = useState(
		moment(new Date()).format("L")
	);
	const [registerDay, setRegisterDay] = useState(new Date());
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const { userPrivateInformation } = useSelector(
		(state) => state.administrator
	);
	const { foodUserRegisters, dateOfUserRegister } = useSelector(
		(state) => state.administratorSpecificUser
	);

	const filterFoodsPerDayFoodId = (foods = [], filterId) => {
		return foods.filter((food) => food.day_food_id === filterId);
	};

	const goBack = () => {
		navigation.goBack();
	};

	const caloriesRecommendationsPerDayFood = userPrivateInformation?.profile
		?.profile_have_caloric_plan
		? [
				Math.ceil(
					userPrivateInformation.profile.profile_caloric_plan * 0.2
				),
				Math.ceil(
					userPrivateInformation.profile.profile_caloric_plan * 0.1
				),
				Math.ceil(
					userPrivateInformation.profile.profile_caloric_plan * 0.35
				),
				Math.ceil(
					userPrivateInformation.profile.profile_caloric_plan * 0.1
				),
				Math.ceil(
					userPrivateInformation.profile.profile_caloric_plan * 0.25
				),
		  ]
		: [];

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setRegisterDay(date);
		dispatch(setDateOfUserRegister(formatDate(date)));
		setRegisterDayToShow(moment(date).format("L"));
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			setRegisterDay(new Date());
			setRegisterDayToShow(moment(new Date()).format("L"));
			dispatch(setDateOfUserRegister(formatDate(new Date())));
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (userPrivateInformation?.user)
			dispatch(startGetUserRegistersPerDay());
	}, [dateOfUserRegister, userPrivateInformation]);

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
										userPrivateInformation?.user?.created_at
									)
								)
							}
							maximumDate={new Date()}
							isVisible={showDateTimePicker}
							onConfirm={confirmDate}
							onCancel={setShowDateTimePicker.bind(this, false)}
							locale="es_ES"
							headerTextIOS="Escoge la fecha"
						/>
					</View>

					<View style={styles.totalConsumedContainer}>
						<Text style={styles.totalConsumedText}>
							Total Consumido:{" "}
							{totalCaloriesConsumed(foodUserRegisters)}
						</Text>
					</View>
					<View style={{ flex: 1 }}>
						<ScrollView>
							<View style={styles.row}>
								<DayFood
									owner={false}
									title="Desayuno"
									recommended={
										caloriesRecommendationsPerDayFood[0]
									}
									dayId={1}
									data={filterFoodsPerDayFoodId(
										foodUserRegisters,
										1
									)}
									total={totalCaloriesConsumed(
										filterFoodsPerDayFoodId(
											foodUserRegisters,
											1
										)
									)}
								/>
							</View>
							<View style={styles.row}>
								<DayFood
									owner={false}
									title="Media Mañana"
									recommended={
										caloriesRecommendationsPerDayFood[1]
									}
									dayId={2}
									data={filterFoodsPerDayFoodId(
										foodUserRegisters,
										2
									)}
									total={totalCaloriesConsumed(
										filterFoodsPerDayFoodId(
											foodUserRegisters,
											2
										)
									)}
								/>
							</View>
							<View style={styles.row}>
								<DayFood
									owner={false}
									title="Almuerzo"
									recommended={
										caloriesRecommendationsPerDayFood[2]
									}
									dayId={3}
									data={filterFoodsPerDayFoodId(
										foodUserRegisters,
										3
									)}
									total={totalCaloriesConsumed(
										filterFoodsPerDayFoodId(
											foodUserRegisters,
											3
										)
									)}
								/>
							</View>
							<View style={styles.row}>
								<DayFood
									owner={false}
									title="Media Tarde"
									recommended={
										caloriesRecommendationsPerDayFood[3]
									}
									dayId={4}
									data={filterFoodsPerDayFoodId(
										foodUserRegisters,
										4
									)}
									total={totalCaloriesConsumed(
										filterFoodsPerDayFoodId(
											foodUserRegisters,
											4
										)
									)}
								/>
							</View>
							<View style={styles.row}>
								<DayFood
									owner={false}
									title="Noche"
									recommended={
										caloriesRecommendationsPerDayFood[4]
									}
									dayId={5}
									data={filterFoodsPerDayFoodId(
										foodUserRegisters,
										5
									)}
									total={totalCaloriesConsumed(
										filterFoodsPerDayFoodId(
											foodUserRegisters,
											5
										)
									)}
								/>
							</View>
						</ScrollView>
					</View>
					<MainButton
						onPress={goBack}
						containerStyle={styles.buttonContainer}
					>
						Volver
					</MainButton>
				</>
			)}
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
	totalConsumedContainer: {
		marginVertical: 8,
	},
	totalConsumedText: {
		textAlign: "center",
		fontFamily: "poppins-bold",
		fontSize: 18,
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
	buttonContainer: {
		marginVertical: 10,
	},
});
