import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { MainButton } from "../../components/MainButton";
import { useSelector } from "react-redux";
import { BoxMessage } from "../../components/BoxMessage";
import { useNavigation } from "@react-navigation/native";

export const Results = () => {
	const information = useSelector(
		(state) => state.createAccountProcess.informationToShow
	);
	const navigation = useNavigation();

	const goToCaloricPlan = () => {
		navigation.navigate("CaloricPlanResult");
	};

	return (
		<ScrollView
			contentContainerStyle={
				{ flex: Dimensions.get('window').height > 600 ? 1 : null }
			}
		>
			<View style={styles.screen}>
				<View style={styles.section}>
					<Text style={styles.resultsIMC}>
						Tu IMC actual es:{" "}
						<Text style={styles.IMC}>
							{information.profileIMC} kg/m2
						</Text>
					</Text>
				</View>
				<View style={styles.section}>
					<View>
						<Text style={styles.subtitle}>
							Según la Organización Mundial de la salud, tu peso
							se clasifica en:
						</Text>
					</View>
					<BoxMessage>{information.weightLevelName}</BoxMessage>
				</View>
				<View style={styles.section}>
					<Text style={styles.subtitle}>
						Posibles riesgos de salud:
					</Text>
					{information.posibleDiseases.length ? (
						<ScrollView style={styles.diseasesList}>
							{information.posibleDiseases.map((disease) => (
								<Text
									style={styles.diseaseItem}
									key={disease.disease_id}
								>
									- {disease.disease_name}
								</Text>
							))}
						</ScrollView>
					) : (
						<BoxMessage>
							No presenta posibles riesgos de salud
						</BoxMessage>
					)}
				</View>
				<View style={styles.section}>
					<View style={styles.bo}>
						<Text style={styles.subtitle}>
							Tu peso ideal es de:
						</Text>
						<BoxMessage>
							{information.profileIdealWeight} kg
						</BoxMessage>
					</View>
				</View>
				<MainButton
					containerStyle={styles.section}
					onPress={goToCaloricPlan}
				>
					Siguiente
				</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: "10%",
		backgroundColor: "white",
		justifyContent: "center",
	},
	section: {
		marginVertical: Dimensions.get("window").height > 600 ? 20 : 10,
	},
	resultsIMC: {
		fontSize: 20,
	},
	IMC: {
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 5,
	},
	diseasesList: {
		width: "100%",
		paddingVertical: 10,
		borderColor: "black",
		borderWidth: 1,
		backgroundColor: "white",
		maxHeight: 100,
	},
	diseaseItem: {
		fontSize: 18,
		marginLeft: 8,
	},
});
