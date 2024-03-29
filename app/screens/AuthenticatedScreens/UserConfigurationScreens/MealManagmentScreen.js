import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../consts/colors";
import {
	getOwnFoods,
	startGetOwnFoodInformation,
} from "../../../actions/foodActions";
import { AlertMessage } from "../../../components/AlertMessage";

export const MealManagementScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { ownFoods } = useSelector((state) => state.food);
	const { messageSuccess } = useSelector((state) => state.ui);

	const renderFoods = ({ item }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => {
					const navToMealForm = () => {
						navigation.navigate("MealForm");
					};
					dispatch(
						startGetOwnFoodInformation(item.food_id, navToMealForm)
					);
				}}
			>
				<View style={styles.foodContainer}>
					<Text style={styles.foodName} numberOfLines={1}>
						{item.food_name}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};

	useEffect(() => {
		dispatch(getOwnFoods());
	}, []);

	return (
		<View style={styles.screen}>
			{messageSuccess && (
				<AlertMessage type="success" message={messageSuccess} />
			)}
			{ownFoods.length > 0 ? (
				<FlatList
					keyExtractor={(item) => item.food_id.toString()}
					data={ownFoods}
					renderItem={renderFoods}
				/>
			) : (
				<Text style={styles.createYourFoodsMessage}>
					Comience a crear sus propias comidas 🍛
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		padding: 15,
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
	createYourFoodsMessage: {
		fontFamily: "poppins",
		fontSize: 20,
		textAlign: "center",
	},
});
