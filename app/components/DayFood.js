import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../consts/colors";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { startDeleteFoodRegister } from "../actions/nutritionSummaryActions";

export const DayFood = ({ title, data, total, dayId, recommended }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const deleteFoodRegister = (foodRegisterId) => {
		dispatch(startDeleteFoodRegister(foodRegisterId));
	};

	const goToSearchFoodScreen = () => {
		navigation.navigate("SearchFood");
	};

	return (
		<View style={styles.dayFoodContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{title}</Text>
				<Ionicons
					name="ios-add-circle-outline"
					size={24}
					onPress={goToSearchFoodScreen}
				/>
			</View>
			{data.length ? (
				data.map((food) => (
					<View
						key={food.food_register_id}
						style={styles.foodRegisterContainer}
					>
						<View style={styles.foodNameContainer}>
							<Text numberOfLines={1}>{food.food_name}</Text>
						</View>
						<View style={styles.caloriesContainer}>
							<Ionicons
								style={styles.deleteIcon}
								name="ios-trash-outline"
								size={20}
								onPress={deleteFoodRegister.bind(
									this,
									food.food_register_id
								)}
							/>
							<Text style={styles.calories}>{food.calories}</Text>
						</View>
					</View>
				))
			) : (
				<View style={styles.recommendedContainer}>
					<Text style={styles.recommendedText}>
						{recommended} Calorías
					</Text>
				</View>
			)}
			<View style={styles.totalContainer}>
				<Text style={styles.totalText}>
					{title} total:{" "}
					<Text style={styles.totalNumber}>
						{total ? total : "--"}
					</Text>
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	dayFoodContainer: {
		width: "100%",
		borderColor: "black",
		borderWidth: 1,
		padding: 5,
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 18,
		fontFamily: "poppins-bold",
	},
	recommendedText: {
		fontSize: 24,
		fontFamily: "poppins-bold",
		color: colors.grayPlaceholder,
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10,
	},
	totalText: {
		textAlign: "right",
		fontSize: 16,
	},
	totalNumber: {
		fontWeight: "bold",
	},
	foodRegisterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
	},
	foodNameContainer: {
		width: "70%",
	},
	caloriesContainer: {
		width: "30%",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	deleteIcon: {
		color: "red",
	},
	calories: {
		marginLeft: "20%",
	},
});
