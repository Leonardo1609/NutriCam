import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useScheduleInput } from "../../../hooks/useScheduleInput";
import { MainButton } from "../../../components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import {
	startConfigSchedule,
	startUpdateSchedule,
} from "../../../actions/scheduleActions";
import { AlertMessage } from "../../../components/AlertMessage";
import { ScrollView } from "react-native-gesture-handler";

export const ScheduleManagement = () => {
	const dispatch = useDispatch();
	const { messageSuccess } = useSelector((state) => state.ui);
	const { schedule } = useSelector((state) => state.schedule);

	const {
		ScheduleInput: BreakFastInput,
		hourFoodToSave: breakfastToSave,
	} = useScheduleInput("Desayuno", 1);

	const {
		ScheduleInput: MidMorningInput,
		hourFoodToSave: midMorningToSave,
	} = useScheduleInput("Media Mañana", 2);
	const {
		ScheduleInput: LunchInput,
		hourFoodToSave: lunchToSave,
	} = useScheduleInput("Almuerzo", 3);
	const {
		ScheduleInput: MidAfternoonInput,
		hourFoodToSave: midAfternoonToSave,
	} = useScheduleInput("Media Tarde", 4);
	const {
		ScheduleInput: DinnerInput,
		hourFoodToSave: dinnerToSave,
	} = useScheduleInput("Cena", 5);

	const submit = () => {
		const dataToSend = {
			1: breakfastToSave,
			2: midMorningToSave,
			3: lunchToSave,
			4: midAfternoonToSave,
			5: dinnerToSave,
		};

		if (!schedule.length) {
			dispatch(startConfigSchedule(dataToSend));
		} else {
			dispatch(startUpdateSchedule(dataToSend));
		}
	};

	return (
		<View style={styles.screen}>
			<ScrollView>
				{messageSuccess && (
					<AlertMessage type="success" message={messageSuccess} />
				)}
				<View style={styles.row}>
					<BreakFastInput />
				</View>
				<View style={styles.row}>
					<MidMorningInput />
				</View>
				<View style={styles.row}>
					<LunchInput />
				</View>
				<View style={styles.row}>
					<MidAfternoonInput />
				</View>
				<View style={styles.row}>
					<DinnerInput />
				</View>
				<View style={styles.scheduleMessageContainer}>
					<Text style={styles.scheduleMessage}>
						Configura tu horario y nosotros te enviaremos
						recordatorios, para que no olvides registrar tus
						comidas.
					</Text>
				</View>
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={submit}
				>
					Guardar
				</MainButton>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
		paddingTop: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
	buttonContainer: {
		marginVertical: 20,
	},
	scheduleMessageContainer: {
		marginVertical: 20,
	},
	scheduleMessage: {
		fontSize: 14,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
});
