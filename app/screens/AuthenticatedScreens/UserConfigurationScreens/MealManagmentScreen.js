import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
	getOwnFoods,
	startGetOwnFoodInformation,
} from "../../../actions/foodActions";

export const MealManagementScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { ownFoods } = useSelector((state) => state.food);

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
			<FlatList
				keyExtractor={(item) => item.food_id.toString()}
				data={ownFoods}
				renderItem={renderFoods}
			/>
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
});
