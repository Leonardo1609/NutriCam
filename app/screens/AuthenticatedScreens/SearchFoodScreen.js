import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
	setActiveOwnFood,
	setFoodsFound,
	startGetFoodInformation,
	startGetFoodMeasureUnits,
} from "../../actions/foodActions";
import { foodNotFoundMessage } from "../../consts/consts";
import { MainButton } from "../../components/MainButton";

export const SearchFoodScreen = ({ route }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { foodSearchInput, foodsFound } = useSelector((state) => state.food);

	const [dayIdToRegist, setDayIdToRegist] = useState(null);

	const goToRegistFood = (food) => {
		const navToRegistFoodScreen = () => {
			navigation.navigate("RegistFood", { dayIdToRegist });
		};
		dispatch(startGetFoodMeasureUnits(food.food_id));
		dispatch(
			startGetFoodInformation(food.food_id, null, navToRegistFoodScreen)
		);
	};

	const navToMealForm = () => {
		dispatch(setActiveOwnFood(null));
		navigation.navigate("MealForm");
	};

	const renderFoods = (food) => {
		const { item, index } = food;
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={goToRegistFood.bind(this, item)}
			>
				<View
					style={
						index ? styles.foodContainer : styles.firstFoodContainer
					}
				>
					<Text style={styles.foodName}>{item.food_name}</Text>
				</View>
			</TouchableOpacity>
		);
	};

	useEffect(() => {
		if (route.params?.dayIdToRegist) {
			setDayIdToRegist(route.params.dayIdToRegist);
		}

		return () => {
			dispatch(setFoodsFound([], ""));
		};
	}, []);

	return (
		<View style={styles.screen}>
			<View style={styles.resultMessageContainer}>
				{!foodSearchInput ? (
					<Text style={styles.resultMessage}>
						Busca alguna comida
					</Text>
				) : foodSearchInput && foodsFound.length ? (
					<Text style={styles.resultMessage}>
						Resultados para:{" "}
						<Text style={styles.foodSearchedText}>
							{foodSearchInput}
						</Text>
					</Text>
				) : (
					<Text style={styles.resultMessage}>
						No se encontraron resultados para:{" "}
						<Text style={styles.foodSearchedText}>
							{foodSearchInput}
						</Text>
					</Text>
				)}
			</View>
			{foodSearchInput && foodsFound.length ? (
				<View style={styles.listContainer}>
					<FlatList
						keyExtractor={(item) => item.food_id.toString()}
						data={foodsFound}
						renderItem={renderFoods}
					/>
				</View>
			) : null}
			{foodSearchInput ? (
				<View style={styles.ifFoodNotFoundContainer}>
					<Text style={styles.ifFoodNotFoundText}>
						{foodNotFoundMessage}
					</Text>
					<MainButton
						onPress={() => navToMealForm()}
						containerStyle={styles.buttonContainer}
					>
						Crear Comida
					</MainButton>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	resultMessageContainer: {
		marginVertical: 20,
	},
	resultMessage: {
		fontSize: 18,
	},
	foodSearchedText: {
		fontWeight: "bold",
	},
	foodContainer: {
		padding: Dimensions.get("window").height > 600 ? 15 : 8,
		borderTopWidth: 1,
		borderTopColor: "black",
	},
	firstFoodContainer: {
		padding: Dimensions.get("window").height > 600 ? 15 : 8,
	},
	foodName: {
		fontSize: Dimensions.get("window").height > 600 ? 14 : 12,
	},
	listContainer: {
		maxHeight: Dimensions.get("window").height > 600 ? 300 : 150,
		borderColor: "black",
		borderWidth: 1,
		elevation: 2,
	},
	ifFoodNotFoundContainer: {
		marginVertical: 20,
	},
	ifFoodNotFoundText: {
		fontSize: 18,
		fontFamily: "poppins",
	},
	buttonContainer: {
		marginVertical: 10,
	},
});
