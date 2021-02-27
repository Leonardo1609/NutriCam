import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { indications } from "../../consts/consts";
import { MainButton } from "../../components/MainButton";

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
			<View style={styles.row}>
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
			<View style={styles.row}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Altura*</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput />
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Sexo*</Text>
				</View>
				<View style={styles.inputContainer}>
					<Picker>
						<Picker.Item value={0} label="--Seleccionar--" />
						{[...genres.keys()].map((genreKey) => (
							<Picker.Item
								key={genreKey}
								value={genreKey}
								label={genres.get(genreKey)}
							/>
						))}
					</Picker>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Peso Actual*</Text>
				</View>
				<View style={styles.inputContainer}>
					<TextInput />
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Nivel de Ac. Física*</Text>
				</View>
				<View style={styles.inputContainer}>
					<Picker>
						<Picker.Item value={0} label="--Seleccionar--" />
						{[...activityLevels.keys()].map((actLvlKey) => (
							<Picker.Item
								key={actLvlKey}
								value={actLvlKey}
								label={activityLevels.get(actLvlKey)}
							/>
						))}
					</Picker>
				</View>
			</View>
			<View>
				<Text>{indications}</Text>
			</View>
			<MainButton>Siguiente</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
		paddingVertical: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		width: '80%'
	},
	labelContainer: {
		flex: 1,
		paddingRight: 20,
	},
	label: {
		textAlign: "right",
		fontSize: 18,
	},
	inputContainer: {
		flex: 1,
	},
});
