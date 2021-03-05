import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BoxMessage } from "../../components/BoxMessage";
import { MainButton } from "../../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import { startCreateUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export const CaloricPlanResult = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { dataToRegist, informationToShow } = useSelector(
		(state) => state.createAccountProcess
	);

	const cancelRegistration = () => {
		navigation.navigate("FirstScreen");
	};

	const submit = () => {
		dispatch(startCreateUser());
	};

	return (
		<View style={styles.screen}>
			<View style={styles.row}>
				<View>
					<Text style={styles.message}>
						Según tus datos, tu plan calórico diario es:
					</Text>
				</View>
				<BoxMessage>
					{informationToShow.profileCaloricPlan} Cal
				</BoxMessage>
			</View>
			<MainButton containerStyle={styles.row} onPress={submit}>
				Empezar
			</MainButton>
			<MainButton
				containerStyle={styles.row}
				buttonStyle={styles.cancelButton}
				onPress={cancelRegistration}
			>
				Cancelar
			</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
		justifyContent: "center",
	},
	message: {
		fontSize: 18,
		marginBottom: 5,
	},
	cancelButton: {
		backgroundColor: "red",
	},
	row: {
		marginVertical: 20,
	},
});
