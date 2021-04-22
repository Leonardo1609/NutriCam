import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import {
	startGetDateFirstUserCreated,
	startGetUsersQuantity,
} from "../../../../actions/administratorActions";
import { colors } from "../../../../consts/colors";

export const StatisticsScreen = () => {
	const dispatch = useDispatch();
	const { usersQuantity } = useSelector((state) => state.administrator);
	const [data, setData] = useState(null);
	const { dateFirstUserCreated } = useSelector(
		(state) => state.administrator
	);

	useEffect(() => {
		dispatch(startGetDateFirstUserCreated());
	}, []);

	useEffect(() => {
		dispatch(startGetUsersQuantity());
	}, []);

	useEffect(() => {
		setData([
			{
				name: "Usuarios con plan calórico",
				population: usersQuantity.withCaloricPlan,
				color: colors.green,
			},
			{
				name: "Usuarios sin plan calórico",
				population: usersQuantity.withoutCaloricPlan,
				color: "red",
			},
		]);
	}, [usersQuantity]);

	return (
		<View style={styles.screen}>
			{data && (
				<>
					<View style={styles.chartContainer}>
						<PieChart
							hasLegend={false}
							chartConfig={{
								color: (opacity = 1) =>
									`rgba(255, 255, 255, ${opacity})`,
							}}
							data={data}
							center={[75, 0]}
							width={Dimensions.get("window").width * 0.75}
							height={Dimensions.get("window").width * 0.75}
							accessor={"population"}
						/>
					</View>
					<View style={styles.resultsContainer}>
						<Text style={styles.withCaloricPlanText}>
							Usuarios con plan nutricional:{" "}
							{usersQuantity.withCaloricPlan}
						</Text>
						<Text style={styles.withoutCaloricPlanText}>
							Usuarios sin plan nutricional:{" "}
							{usersQuantity.withoutCaloricPlan}
						</Text>
						<Text style={styles.totalText}>
							Total de usuarios: {usersQuantity.total}
						</Text>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
	chartContainer: {
		alignItems: "center",
	},
	resultsContainer: {
		alignItems: "center",
	},
	withCaloricPlanText: {
		fontSize: 18,
		fontFamily: "poppins-bold",
		color: colors.green,
	},
	withoutCaloricPlanText: {
		fontSize: 18,
		fontFamily: "poppins-bold",
		color: "red",
	},
	totalText: {
		fontSize: 18,
		fontFamily: "poppins-bold",
	},
});
