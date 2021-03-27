import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	Dimensions,
} from "react-native";
import { MainButton } from "../../components/MainButton";
import PickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { startRegistFood } from "../../actions/nutritionSummaryActions";
import { ScrollView } from "react-native-gesture-handler";
import { dayFoodMap, toTwoDecimals } from "../../helpers/helpers";
import { useForm } from "../../hooks/useForm";
import { registFoodValidation } from "../../validations/registFoodValidation";

export const FoodRegistrationScreen = ({ route }) => {
	const initialState = {
		dayIdToRegist: 1,
		quantity: 1,
	};

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { activeFoodToRegist } = useSelector((state) => state.food);

	const { formValues, handleChange, handleSubmit, errors } = useForm(
		initialState,
		registFoodValidation,
		registFood
	);
	const { dayIdToRegist, quantity } = formValues;

	// const [dayIdToRegist, setDayIdToRegist] = useState(1);
	// const [quantity, setQuantity] = useState(1);
	const [icon, setIcon] = useState(null);

	const iconImage =
		icon?.iconName === "pan"
			? require("../../assets/images/icons/bread.png")
			: icon?.iconName === "cerveza"
			? require("../../assets/images/icons/beer.png")
			: icon?.iconName === "dona"
			? require("../../assets/images/icons/donut.png")
			: require("../../assets/images/icons/soda.png");

	const pickerStyle = () => ({
		inputAndroid: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: errors["dayIdToRegist"] ? "red" : "black",
			paddingVertical: 5,
			fontSize: 16,
			fontWeight: "bold",
		},
		inputIOS: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: errors["dayIdToRegist"] ? "red" : "black",
			paddingVertical: 5,
			fontSize: 16,
			fontWeight: "bold",
		},
	});

	const formatTotal = (quantity) => {
		if (activeFoodToRegist.measure_unit_id === 1) {
			// 100g
			return `${quantity}00g`;
		} else if (activeFoodToRegist.measure_unit_id === 2) {
			// unidad
			return `${quantity} ${quantity > 1 ? "unidades" : "unidad"}`;
		} else {
			// porción
			return `${quantity} ${quantity > 1 ? "porciones" : "porción"}`;
		}
	};

	const equivalence = () => {
		return Math.ceil(
			(activeFoodToRegist.food_calories * quantity) / icon.foodCalories
		);
	};

	const handleQuantity = (value) => {
		let quantityValue = value;
		let quantityWeight = /^\d*\.?\d*$/;

		if (quantityValue > 99) {
			quantityValue = 99;
		}

		if (quantityWeight.test(quantityValue)) {
			handleChange(quantityValue, "quantity");
		}
	};

	function registFood() {
		const nav = () => {
			navigation.navigate("Home");
		};
		dispatch(
			startRegistFood(
				dayIdToRegist,
				activeFoodToRegist.measure_unit_id,
				activeFoodToRegist.food_id,
				activeFoodToRegist.food_name,
				quantity,
				quantity * activeFoodToRegist.food_calories,
				nav
			)
		);
	}

	useEffect(() => {
		const setFoodIcon = async () => {
			const iconObject = JSON.parse(await AsyncStorage.getItem("icon"));
			setIcon(iconObject);
		};
		setFoodIcon();
	}, []);

	useEffect(() => {
		if (route.params?.dayIdToRegist) {
			handleChange(route.params.dayIdToRegist, "dayIdToRegist");
		}
	}, []);

	return (
		<View style={styles.screen}>
			<ScrollView>
				{activeFoodToRegist && (
					<>
						<View style={styles.pickerContainer}>
							<PickerSelect
								style={pickerStyle()}
								value={dayIdToRegist}
								placeholder={{}}
								useNativeAndroidPickerStyle={false}
								onValueChange={(value) =>
									handleChange(value, "dayIdToRegist")
								}
								items={[...dayFoodMap.keys()].map(
									(dayFoodKey) => ({
										label: dayFoodMap.get(dayFoodKey),
										value: dayFoodKey,
									})
								)}
							/>
						</View>
						<View style={styles.quantityContainer}>
							<View style={styles.quantityTitleContainer}>
								<Text style={styles.quantityTitle}>
									Cantidad*
								</Text>
							</View>
							<View style={styles.quantityInputContainer}>
								<TextInput
									style={{
										...styles.quantityInput,
										borderBottomColor: errors["quantity"]
											? "red"
											: "black",
									}}
									onChangeText={handleQuantity}
									value={quantity.toString()}
									keyboardType="numeric"
								/>
							</View>
							<View style={styles.unitMeasureContainer}>
								<Text style={styles.unitMeasure}>
									{activeFoodToRegist.measure_name}
								</Text>
							</View>
						</View>
						<View style={styles.totalGramsContainer}>
							<Text style={styles.totalGrams}>
								<Text style={styles.totalText}>Total:</Text>{" "}
								{formatTotal(quantity)}
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
						<MainButton onPress={handleSubmit}>Guardar</MainButton>
					</>
				)}
			</ScrollView>
		</View>
	);
};

console.log();

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	pickerContainer: {
		marginVertical: 20,
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
		width: Dimensions.get("window").width > 400 ? 75 : 35,
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
