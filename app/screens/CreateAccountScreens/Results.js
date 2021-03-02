import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { MainButton } from "../../components/MainButton";
import { BoxMessage } from "../../components/BoxMessage";
import { useNavigation } from "@react-navigation/native";

export const Results = () => {
	const navigation = useNavigation();
	const diseases = [
		{ id: 1, name: "Diabetes" },
		{ id: 2, name: "Hipertensión" },
		{ id: 3, name: "Enfermedad 3" },
	];

	const goToCaloricPlan = () => {
		navigation.navigate("CaloricPlanResult");
	};

	return (
		<View style={styles.screen}>
			<View style={styles.section}>
				<Text style={styles.resultsIMC}>
					Tu IMC actual es: <Text style={styles.IMC}>20.0 kg/m2</Text>
				</Text>
			</View>
			<View style={styles.section}>
				<View>
					<Text style={styles.subtitle}>
						Según la Organización Mundial de la salud, tu peso se
						clasifica en:
					</Text>
				</View>
				<BoxMessage>Sobrepeso</BoxMessage>
			</View>
			<View style={styles.section}>
				<Text style={styles.subtitle}>Posibles riesgos de salud:</Text>
				<ScrollView style={styles.diseasesList}>
					{diseases.map((disease) => (
						<Text style={styles.diseaseItem} key={disease.id}>
							- {disease.name}
						</Text>
					))}
				</ScrollView>
			</View>
			<View style={styles.section}>
				<View>
					<Text style={styles.subtitle}>Tu peso ideal es de:</Text>
					<BoxMessage>60 kg</BoxMessage>
				</View>
			</View>
			<MainButton
				containerStyle={styles.section}
				onPress={goToCaloricPlan}
			>
				Siguiente
			</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// alignItems: "center",
		paddingHorizontal: "10%",
		backgroundColor: "white",
		justifyContent: "center",
	},
	section: {
		marginVertical: 20,
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
