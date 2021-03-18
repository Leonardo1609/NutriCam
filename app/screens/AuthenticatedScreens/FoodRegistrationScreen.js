import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { MainButton } from "../../components/MainButton";
import PickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { startRegistFood } from "../../actions/nutritionSummaryActions";

export const FoodRegistrationScreen = ({ route }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { activeFoodToRegist } = useSelector((state) => state.food);
	console.log(activeFoodToRegist);

	const [dayIdToRegist, setDayIdToRegist] = useState(1);
	const [quantity, setQuantity] = useState(1);
	const [icon, setIcon] = useState(null);

	const iconImage =
		icon?.iconName === "pan"
			? require("../../assets/images/icons/bread.png")
			: icon?.iconName === "cerveza"
			? require("../../assets/images/icons/beer.png")
			: icon?.iconName === "dona"
			? require("../../assets/images/icons/donut.png")
			: require("../../assets/images/icons/soda.svg");

	const dayFoodMap = new Map([
		[1, "Registrar Desayuno"],
		[2, "Registrar Media Mañana"],
		[3, "Registrar Almuerzo"],
		[4, "Registrar Media Tarde"],
		[5, "Registrar Cena"],
	]);

	const equivalence = () => {
		return Math.ceil(
			(activeFoodToRegist.food_calories * quantity) / icon.foodCalories
		);
	};

	const toTwoDecimals = (number) => {
		return parseFloat(number).toFixed(2);
	};

	const registFood = () => {
		dispatch(
			startRegistFood(
				dayIdToRegist,
				1,
				activeFoodToRegist.food_id,
				activeFoodToRegist.food_name,
				quantity,
				quantity * activeFoodToRegist.food_calories
			)
		);
		navigation.navigate("Home");
	};

	useEffect(() => {
		const setFoodIcon = async () => {
			const iconObject = JSON.parse(await AsyncStorage.getItem("icon"));
			setIcon(iconObject);
		};

		setFoodIcon();
	}, []);

	useEffect(() => {
		if (route.params?.dayIdToRegist) {
			setDayIdToRegist(route.params.dayIdToRegist);
		}
	}, []);

	return (
		<View style={styles.screen}>
			{activeFoodToRegist && (
				<>
					<View>
						<PickerSelect
							value={dayIdToRegist}
							useNativeAndroidPickerStyle={false}
							onValueChange={(value) => setDayIdToRegist(value)}
							items={[...dayFoodMap.keys()].map((dayFoodKey) => ({
								label: dayFoodMap.get(dayFoodKey),
								value: dayFoodKey,
							}))}
						/>
					</View>
					<View style={styles.quantityContainer}>
						<View style={styles.quantityTitleContainer}>
							<Text style={styles.quantityTitle}>Cantidad*</Text>
						</View>
						<View style={styles.quantityInputContainer}>
							<TextInput
								style={styles.quantityInput}
								onChangeText={(value) => setQuantity(value)}
								value={quantity.toString()}
								keyboardType="numeric"
							/>
						</View>
						<View style={styles.unitMeasureContainer}>
							<Text style={styles.unitMeasure}>100g</Text>
						</View>
					</View>
					<View style={styles.totalGramsContainer}>
						<Text style={styles.totalGrams}>
							<Text style={styles.totalText}>Total:</Text>{" "}
							{100 * quantity}g
						</Text>
					</View>
					<View style={styles.nutritionalInformationContainer}>
						<Text style={styles.nutritionalInformationTitle}>
							Información Nutricional
						</Text>
						<View style={styles.nutritionalValues}>
							<View style={styles.nutritionalValueContainer}>
								<Text style={styles.nutritionalTitle}>
									Calorías
								</Text>
								<Text style={styles.nutritionalValue}>
									{activeFoodToRegist.food_calories *
										quantity}{" "}
									cal
								</Text>
							</View>
							<View style={styles.nutritionalValueContainer}>
								<Text style={styles.nutritionalTitle}>
									Grasas Totales
								</Text>
								<Text style={styles.nutritionalValue}>
									{activeFoodToRegist.food_fats
										? toTwoDecimals(
												activeFoodToRegist.food_fats *
													quantity
										  ) + " g"
										: "--"}
								</Text>
							</View>
							<View style={styles.nutritionalValueContainer}>
								<Text style={styles.nutritionalTitle}>
									Carbohidratos Totales
								</Text>
								<Text style={styles.nutritionalValue}>
									{activeFoodToRegist.food_carbohydrates
										? toTwoDecimals(
												activeFoodToRegist.food_carbohydrates *
													quantity
										  ) + " g"
										: "--"}
								</Text>
							</View>
							<View style={styles.nutritionalValueContainer}>
								<Text style={styles.nutritionalTitle}>
									Proteinas
								</Text>
								<Text style={styles.nutritionalValue}>
									{activeFoodToRegist.food_proteins
										? toTwoDecimals(
												activeFoodToRegist.food_proteins *
													quantity
										  ) + " g"
										: "--"}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.equivalenceContainer}>
						<Text style={styles.equivalenceTitle}>
							Tu comida equivale en calorías a:
						</Text>
						{icon && (
							<View style={styles.equivalenceIconContainer}>
								<Text style={styles.equivalence}>
									{equivalence()}
								</Text>
								<View style={styles.iconContainer}>
									<Image
										style={styles.icon}
										source={iconImage}
									/>
								</View>
							</View>
						)}
					</View>
					<MainButton onPress={registFood}>Guardar</MainButton>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	quantityContainer: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	quantityTitleContainer: {},
	quantityTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	quantityInputContainer: {
		width: 75,
	},
	quantityInput: {
		borderBottomColor: "black",
		borderBottomWidth: 1,
		textAlign: "center",
		fontSize: 20,
	},
	unitMeasureContainer: {
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 5,
		paddingVertical: 4,
		paddingHorizontal: 20,
	},
	unitMeasure: {
		fontSize: 20,
		fontWeight: "bold",
	},
	totalGramsContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
	},
	totalGrams: {
		fontSize: 20,
	},
	totalText: {
		fontWeight: "bold",
	},
	equivalenceContainer: {
		flexDirection: "row",
	},
	nutritionalInformationContainer: {
		marginVertical: 20,
	},
	nutritionalInformationTitle: {
		fontSize: 20,
		fontFamily: "poppins-bold",
	},
	nutritionalValues: {
		borderColor: "black",
		borderWidth: 1,
		overflow: "hidden",
	},
	nutritionalValueContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderColor: "black",
		borderWidth: 1,
	},
	nutritionalTitle: {
		fontSize: 14,
		fontFamily: "poppins-bold",
	},
	nutritionalValue: {
		fontSize: 14,
		fontWeight: "bold",
	},
	equivalenceContainer: {
		marginVertical: 10,
	},
	equivalenceTitle: {
		textAlign: "center",
		fontFamily: "poppins-bold",
		fontSize: 18,
	},
	equivalenceIconContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	equivalence: {
		textAlignVertical: "center",
		fontWeight: "bold",
		fontSize: 45,
		marginRight: 20,
	},
	iconContainer: {
		width: 80,
		height: 80,
	},
	icon: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});
