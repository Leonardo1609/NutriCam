import React, { useState } from "react";
import {
	View,
	Text,
	TouchableNativeFeedback,
	Dimensions,
	StyleSheet,
} from "react-native";
import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { formatDate } from "../helpers/helpers";
import { colors } from "../consts/colors";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const useFilterDate = (label, minDate = null) => {
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [dateToShow, setDateToShow] = useState(null);
	const [dateToSend, setDateToSend] = useState(null);
	const [dateToPicker, setDateToPicker] = useState(new Date());

	const confirmDate = (date) => {
		setShowDateTimePicker(false);
		setDateToShow(moment(date).format("L"));
		setDateToSend(formatDate(date));
		setDateToPicker(date);
	};

	const FilterDatePicker = () => (
		<View style={styles.filterContainer}>
			<View style={styles.labelContainer}>
				<Text style={styles.labelText}>{label}</Text>
			</View>
			<View style={styles.inputContainer}>
				<TouchableNativeFeedback
					onPress={setShowDateTimePicker.bind(this, true)}
				>
					<View style={styles.input}>
						<Text
							style={
								!dateToShow
									? styles.placeholder
									: styles.selected
							}
						>
							{dateToShow ? dateToShow : "dd:mm:yyyy"}
						</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
			<DateTimePickerModal
				mode="date"
				value={dateToPicker}
				isVisible={showDateTimePicker}
				onConfirm={confirmDate}
				onCancel={setShowDateTimePicker.bind(this, false)}
				minimumDate={minDate}
				locale="es_ES"
				maximumDate={new Date()}
			/>
		</View>
	);

	return {
		dateToSend,
		FilterDatePicker,
	};
};

const styles = StyleSheet.create({
	filterContainer: {},
	labelContainer: {},
	label: {
		textAlign: "left",
		fontSize: Dimensions.get("window").width > 350 ? 16 : 14,
	},
	inputContainer: {},
	placeholder: {
		color: colors.grayPlaceholder,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
});
