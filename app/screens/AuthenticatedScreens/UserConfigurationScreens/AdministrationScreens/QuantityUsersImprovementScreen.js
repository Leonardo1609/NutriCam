import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { startGetQuantityUsersImprovement } from "../../../../actions/administratorActions";

export const QuantityUsersImprovementScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { quantityUsersImprovement } = useSelector(
		(state) => state.administrator
	);

	const data = quantityUsersImprovement && {
		labels: [...Object.keys(quantityUsersImprovement)],
		datasets: {
			data: [...Object.values(quantityUsersImprovement)],
		},
	};
	console.log(data);

	useEffect(() => {
		dispatch(startGetQuantityUsersImprovement());
	}, []);

	return (
		<View style={styles.screen}>
			<Text>QuantityUsersImprovementScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
});
