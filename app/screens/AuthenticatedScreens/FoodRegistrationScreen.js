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
	const [portions, setPortions] = useState(1);
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
			(activeFoodToRegist.food_calories * portions) / icon.foodCalories
		);
	};

	const registFood = () => {
		dispatch(
			startRegistFood(
				dayIdToRegist,
				1,
				activeFoodToRegist.food_id,
				activeFoodToRegist.food_name,
				portions,
				portions * activeFoodToRegist.food_calories
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
					<View>
						<View>
							<Text>Porciones:</Text>
						</View>
						<View>
							<TextInput
								onChangeText={(value) => setPortions(value)}
								value={portions.toString()}
								keyboardType="numeric"
							/>
						</View>
						<View>
							<Text>100g</Text>
						</View>
					</View>
					<View>
						<Text>Total: {100 * portions} g</Text>
					</View>
					<View>
						<Text>Información Nutricional</Text>
						<View>
							<View>
								<Text>Calorías</Text>
								<Text>{activeFoodToRegist.food_calories}</Text>
							</View>
							<View>
								<Text>Grasas Totales</Text>
								<Text>
									{activeFoodToRegist.food_fats || "--"}
								</Text>
							</View>
							<View>
								<Text>Carbohidratos Totales</Text>
								<Text>
									{activeFoodToRegist.food_carbohydrates ||
										"--"}
								</Text>
							</View>
							<View>
								<Text>Calorías</Text>
								<Text>
									{activeFoodToRegist.food_proteins || "--"}
								</Text>
							</View>
						</View>
					</View>
					<View style={styles.equivalenceContainer}>
						<Text>Tu comida equivale en calorías a: </Text>
						{icon && (
							<View>
								<Text>{equivalence()}</Text>
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
	equivalenceContainer: {
		flexDirection: "row",
	},
	iconContainer: {
		width: 100,
		height: 100,
	},
	icon: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});
