import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { BoxMessage } from "../../../../components/BoxMessage";
import { MainButton } from "../../../../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export const CaloricPlanResultCalculator = () => {
	const navigation = useNavigation();
	const { informationToShow } = useSelector(
		(state) => state.createAccountProcess
	);

	const finishCalculation = () => {
		navigation.navigate("MyAccount");
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
			<MainButton
				containerStyle={styles.row}
				buttonStyle={styles.finishCalculation}
				onPress={finishCalculation}
			>
				Finalizar
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
	finishCalculation: {
		backgroundColor: "red",
	},
	row: {
		marginVertical: 20,
	},
});
