import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { startGetQuantityUsersImprovement } from "../../../../actions/administratorActions";
import { PieChart } from "react-native-chart-kit";
import { colors } from "../../../../consts/colors";
import { MainButton } from "../../../../components/MainButton";

export const QuantityUsersImprovementScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [data, setData] = useState(null);
	const { quantityUsersImprovement } = useSelector(
		(state) => state.administrator
	);

	const goToUsersImprovement = () => {
		navigation.navigate("UsersImprovement");
	};

	useEffect(() => {
		dispatch(startGetQuantityUsersImprovement());
	}, []);

	useEffect(() => {
		if (quantityUsersImprovement) {
			setData([
				{
					name: "Mantener",
					population:
						quantityUsersImprovement.quantity_users_mantained,
					color: colors.grayPlaceholder,
				},
				{
					name: "Mejorar",
					population:
						quantityUsersImprovement.quantity_users_improvement,
					color: colors.green,
				},
				{
					name: "Empeorar",
					population: quantityUsersImprovement.quantity_users_worsen,
					color: "red",
				},
			]);
		}
	}, [quantityUsersImprovement]);

	return (
		<View style={styles.screen}>
			{quantityUsersImprovement && data && (
				<>
					<Text style={styles.title}>
						Condición de usuarios según su IMC
					</Text>
					<PieChart
						hasLegend={false}
						chartConfig={{
							color: (opacity = 1) =>
								`rgba(255, 255, 255, ${opacity})`,
						}}
						data={data}
						center={[85, 0]}
						width={Dimensions.get("window").width * 0.7}
						height={Dimensions.get("window").width * 0.7}
						accessor={"population"}
					/>
					<View style={styles.resultsContainer}>
						<Text style={styles.mantainedText}>
							Usuarios con IMC mantenido:{" "}
							{quantityUsersImprovement.quantity_users_mantained}
						</Text>
						<Text style={styles.improvementText}>
							Usuarios con IMC mejorado:{" "}
							{
								quantityUsersImprovement.quantity_users_improvement
							}
						</Text>
						<Text style={styles.worsenText}>
							Usuarios con IMC empeorado:{" "}
							{quantityUsersImprovement.quantity_users_worsen}
						</Text>
					</View>
					<MainButton
						containerStyle={styles.buttonContainer}
						onPress={goToUsersImprovement}
					>
						Ver usuarios
					</MainButton>
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
		paddingTop: 20,
	},
	title: {
		fontSize: 18,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
	mantainedText: {
		color: colors.grayPlaceholder,
		textAlign: "center",
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	improvementText: {
		color: colors.green,
		textAlign: "center",
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	worsenText: {
		color: "red",
		textAlign: "center",
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	buttonContainer: {
		marginVertical: 15,
	},
});
