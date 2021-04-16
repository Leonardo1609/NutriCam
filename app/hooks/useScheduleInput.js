import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors } from "../consts/colors";
import { formatHour } from "../helpers/helpers";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

export const useScheduleInput = (label, dayFoodId) => {
	const { schedule } = useSelector((state) => state.schedule);

	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [hourFoodToShow, setHourFoodToShow] = useState(null);
	const [hourFoodToSave, setHourFoodToSave] = useState(null);
	const [hourFoodToPicker, setHourFoodToPicker] = useState();

	const confirmHour = (value) => {
		const hourFormated = formatHour(value.getHours(), value.getMinutes());
		setHourFoodToShow(hourFormated);
		setHourFoodToSave(hourFormated);
		setHourFoodToPicker(value);
		setShowDateTimePicker(false);
	};

	const removeHour = () => {
		setHourFoodToSave(null);
		setHourFoodToShow(null);
	};

	useEffect(() => {
		if (schedule.length) {
			const dayMealTime = schedule.find(
				(info) => info.day_food_id === dayFoodId
			);
			setHourFoodToShow(dayMealTime.meal_time);
			setHourFoodToSave(dayMealTime.meal_time);
		}
	}, [schedule]);

	const ScheduleInput = () => (
		<>
			<View style={styles.labelContainer}>
				<View>
					{hourFoodToSave ? (
						<Ionicons
							name="close-circle-outline"
							size={20}
							color="red"
							onPress={removeHour}
						/>
					) : null}
				</View>
				<Text
					style={{
						...styles.label,
					}}
				>
					{label}
				</Text>
			</View>
			<View style={styles.inputContainer}>
				<TouchableNativeFeedback
					onPress={setShowDateTimePicker.bind(this, true)}
				>
					<View
						style={{
							...styles.input,
						}}
					>
						<Text
							style={
								!hourFoodToShow
									? styles.placeholder
									: styles.selected
							}
						>
							{hourFoodToShow ? hourFoodToShow : "hh:mm"}
						</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
			<DateTimePickerModal
				mode="time"
				value={hourFoodToPicker}
				isVisible={showDateTimePicker}
				onConfirm={confirmHour}
				onCancel={setShowDateTimePicker.bind(this, false)}
				is24Hour={true}
			/>
		</>
	);

	return {
		ScheduleInput,
		hourFoodToSave,
	};
};

const styles = StyleSheet.create({
	labelContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
});
