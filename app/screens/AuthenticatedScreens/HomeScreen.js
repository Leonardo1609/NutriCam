import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CalorieBar } from "../../components/CalorieBar";

import moment from "moment";
import "moment/locale/es";
import { DayFood } from "../../components/DayFood";
moment.locale("es");

export const HomeScreen = () => {
	const dispatch = useDispatch();
	const [registerDayToShow, setRegisterDayToShow] = useState(
		moment(new Date()).format("L")
	);

	const { userInformation } = useSelector((state) => state.auth);
	console.log( userInformation );

	const caloriesRecommendationsPerDayFood = userInformation.profile.profile_nutritional_plan && [ 
		Math.ceil(userInformation.profile.profile_caloric_plan * 0.20),
		Math.ceil(userInformation.profile.profile_caloric_plan * 0.10),
		Math.ceil(userInformation.profile.profile_caloric_plan * 0.35),
		Math.ceil(userInformation.profile.profile_caloric_plan * 0.10),
		Math.ceil(userInformation.profile.profile_caloric_plan * 0.25)
	];

	const [registerDayToSend, setRegisterDayToSend] = useState(
		JSON.stringify(new Date()).slice(1, 11)
	);
	const [registerDay, setRegisterDay] = useState(new Date());

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	const confirmDate = (date) => {
		setRegisterDay(date);
		setRegisterDayToSend(JSON.stringify(date).slice(1, 11));
		setRegisterDayToShow(moment(date).format("L"));
		setShowDateTimePicker(false);
	};

	return (
		<View style={styles.screen}>
			{userInformation && (
				<>
					<View style={styles.dateContainer}>
						<View>
							<TouchableNativeFeedback
								onPress={setShowDateTimePicker.bind(this, true)}
							>
								<View>
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
								recommended={caloriesRecommendationsPerDayFood[0]}
								dayId={1}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Media Mañana"
								recommended={caloriesRecommendationsPerDayFood[1]}
								dayId={2}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Almuerzo"
								recommended={caloriesRecommendationsPerDayFood[2]}
								dayId={3}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Media Tarde"
								recommended={caloriesRecommendationsPerDayFood[3]}
								dayId={4}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<DayFood
								title="Noche"
								recommended={caloriesRecommendationsPerDayFood[4]}
								dayId={5}
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
		textAlign: "center",
		fontSize: 18,
		fontFamily: "poppins",
	},
	dateContainer: {
		marginTop: 5,
	},
});
