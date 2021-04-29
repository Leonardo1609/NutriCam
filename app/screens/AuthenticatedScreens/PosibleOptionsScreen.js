import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getFoodId } from "../../actions/foodRecognitionActions";
import {
	startGetFoodMeasureUnits,
	startGetFoodInformation,
} from "../../actions/foodActions";

export const PosibleOptionsScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { image, posibleOptions } = useSelector(
		(state) => state.foodRecognition
	);

	const goToRegistFood = async (foodName) => {
		const navToRegistFoodScreen = () => {
			navigation.navigate("RegistFood");
		};
		try {
			const { foodId } = await getFoodId(foodName);
			dispatch(startGetFoodMeasureUnits(foodId));
			dispatch(
				startGetFoodInformation(foodId, null, navToRegistFoodScreen)
			);
		} catch (e) {
			console.log(e.response);
		}
	};

	return (
		<View style={styles.screen}>
			<View style={styles.imageContainer}>
				<Image style={styles.foodImage} source={{ uri: image.uri }} />
			</View>
			<View style={styles.optionsContainer}>
				<Text style={styles.posibleOptionsTitle}>
					Posibles opciones:
				</Text>
				<View style={styles.optionsList}>
					{posibleOptions.map((option) => (
						<TouchableOpacity
							key={option}
							activeOpacity={0.6}
							onPress={() => {
								goToRegistFood(option);
							}}
						>
							<View style={styles.foodContainer}>
								<Text style={styles.foodName} numberOfLines={1}>
									{option}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</View>
			<View style={styles.messageContainer}>
				<Text style={styles.tryAgainMessage}>
					Si no encontró su comida entre las opciones inténtelo
					nuevamente.
				</Text>
				<Text style={styles.importantMessage}>
					Nota: Una imagen con buena luminosidad y calidad ofrece un
					mejor reconocimiento.
				</Text>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	foodImage: {
		resizeMode: "cover",
		width: "100%",
		height: "100%",
	},
	imageContainer: {
		width: "100%",
		height: "30%",
		maxHeight: 180,
	},
	optionsContainer: {
		paddingHorizontal: "10%",
		paddingTop: 20,
		paddingBottom: 10,
	},
	optionsList: {
		// // marginVertical: 0,
		// backgroundColor: "red",
	},
	posibleOptionsTitle: {
		fontFamily: "poppins-bold",
		fontSize: 28,
	},
	foodContainer: {
		padding: 10,
		borderColor: "#b3b3b3",
		borderWidth: 1,
		borderRadius: 10,
		marginBottom: 10,
		alignItems: "flex-start",
	},
	foodName: {
		fontFamily: "poppins",
		fontSize: 18,
	},
	tryAgainMessage: {
		fontFamily: "poppins",
		fontSize: 16,
		textAlign: "justify",
	},
	importantMessage: {
		fontFamily: "poppins-bold",
		fontSize: 14,
		color: "red",
		textAlign: "justify",
	},
	messageContainer: {
		paddingHorizontal: "10%",
	},
});
