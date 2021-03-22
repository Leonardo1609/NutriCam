import React from "react";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { startGetNutritionSummary } from "../../actions/nutritionSummaryActions";

export const DiarySummaryScreen = () => {
	const dispatch = useDispatch();
	const { dateOfSummary, nutritionSummary } = useSelector((state) => state.nutritionSummary);

	useEffect(() => {
		dispatch(startGetNutritionSummary(dateOfSummary));
	}, [dateOfSummary]);

	return (
		<View>
			<Text>Calorías Consumidas (kcal): { nutritionSummary?.total_calories }</Text>
			<Text>Grasas Totales (g): { nutritionSummary?.total_carbohydrates }</Text>
			<Text>Carbohidratos Totales (g): { nutritionSummary?.total_fats }</Text>
			<Text>Proteínas (g): {nutritionSummary?.total_proteins}</Text>
		</View>
	);
};
