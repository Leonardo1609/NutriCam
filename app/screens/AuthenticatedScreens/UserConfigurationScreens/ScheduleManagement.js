import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableNativeFeedback } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const ScheduleManagement = () => {
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [breakfastToShow, setBreakfastToShow] = useState("");
	const [breakfastToSave, setBreakfastToSave] = useState("");
	const [breakfastToPicker, setBreakfastToPicker] = useState();

	return (
		<View>
			<View style={styles.row}>
				<View style={styles.labelContainer}>
					<Text
						style={{
							...styles.label,
						}}
					>
						F. de Nacimiento*
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
									!breakfastToShow
										? styles.placeholder
										: styles.selected
								}
							>
								{breakfastToShow ? breakfastToShow : "hh:mm"}
							</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
				<DateTimePickerModal
					mode="time"
					isVisible={showDateTimePicker}
					onConfirm={(value) => console.log(value)}
					onCancel={setShowDateTimePicker.bind(this, false)}
					is24Hour={true}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});
