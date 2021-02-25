import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Picker } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export const EnterUserData = () => {
	const [showDateTimePicker, setShowDateTimePicker] = useState(false);
	const [birthdayToShow, setBirthdayToShow] = useState(null);
	const [birthdayToSave, setBirthdayToSave] = useState(null);
	const [height, setHeight] = useState(0);
	const [genre, setGenre] = useState(null);
	const [actualWeight, setActualWeight] = useState(0);
	const [activityLevel, setActivityLevel] = useState(0);

	const activityLevels = new Map([
		[1, "Sedentaria"],
		[2, "Ligera"],
		[3, "Moderada"],
		[4, "Intensa"],
	]);

	const genres = new Map([
		["M", "Masculino"],
		["F", "Femenino"],
	]);

	const confirmDate = (date) => {
		setBirthdayToShow(moment(date).format("L"));
		setShowDateTimePicker(false);
	};

	return (
		<View style={styles.screen}>
			<View>
				<Text>F. de Nacimiento</Text>
				<Button
					onPress={setShowDateTimePicker.bind(
						this,
						!showDateTimePicker
					)}
					title={birthdayToShow ? birthdayToShow : "dd/yy/mm"}
				/>
				<DateTimePickerModal
					mode="date"
					isVisible={showDateTimePicker}
					onCancel={setShowDateTimePicker.bind(this, false)}
					onConfirm={confirmDate}
					locale="es_ES"
					headerTextIOS="Elige tu fecha de nacimiento"
				/>
			</View>
			<View>
		// TODO: deprecated, search another package
				<Picker>
					<Picker.Item value={0} label="--Seleccionar--" />
					{[...activityLevels.keys()].map((actLvl) => (
						<Picker.Item
							key={actLvl}
							value={actLvl}
							label={activityLevels.get(actLvl)}
						/>
					))}
				</Picker>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
});
