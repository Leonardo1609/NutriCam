import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export const ScheduleInput = () => {
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);

	return (
		<>
			<View style={styles.labelContainer}>
				<Text
					style={{
						...styles.label,
					}}
				>
					Desayuno
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
		</>
	);
};

const styles = StyleSheet.create({
	labelContainer: {
		flex: 1,
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
