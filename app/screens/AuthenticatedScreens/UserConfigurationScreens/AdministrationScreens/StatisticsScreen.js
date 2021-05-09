import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, parserDateToLocale } from "../../../../helpers/helpers";
import {
	startGetDateFirstUserCreated,
	startGetUsersQuantity,
} from "../../../../actions/administratorActions";
import { colors } from "../../../../consts/colors";
import { useFilterDate } from "../../../../hooks/useFilterDate";

export const StatisticsScreen = () => {
	const dispatch = useDispatch();
	const { usersQuantity } = useSelector((state) => state.administrator);
	const [data, setData] = useState(null);
	const { dateFirstUserCreated } = useSelector(
		(state) => state.administrator
	);

	const {
		dateToSend: initialDate,
		FilterDatePicker: InitialDatePicker,
	} = useFilterDate(
		"Desde:",
		dateFirstUserCreated && parserDateToLocale(dateFirstUserCreated)
	);
	const {
		dateToSend: lastDate,
		FilterDatePicker: LastDatePicker,
	} = useFilterDate(
		"Hasta:",
		dateFirstUserCreated && parserDateToLocale(dateFirstUserCreated)
	);

	// set minimum and default intial date
	useEffect(() => {
		dispatch(startGetDateFirstUserCreated());
	}, []);

	// set initial users quantity
	useEffect(() => {
		dispatch(startGetUsersQuantity());
	}, []);

	useEffect(() => {
		if (!lastDate && initialDate)
			dispatch(
				startGetUsersQuantity(initialDate, formatDate(new Date()))
			);
		if (!initialDate && dateFirstUserCreated && lastDate)
			dispatch(startGetUsersQuantity(dateFirstUserCreated, lastDate));
		if (initialDate && lastDate)
			dispatch(startGetUsersQuantity(initialDate, lastDate));
	}, [initialDate, lastDate]);

	// data to chart
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
			<View style={styles.datesContainer}>
				<View style={styles.filterDateContainer}>
					<InitialDatePicker />
				</View>
				<View style={styles.filterDateContainer}>
					<LastDatePicker />
				</View>
			</View>
			{data && (
				<>
					{usersQuantity.total > 0 && (
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
					)}
					<View style={styles.resultsContainer}>
						<Text style={styles.withCaloricPlanText}>
							Usuarios con plan calórico:{" "}
							{usersQuantity.withCaloricPlan}
						</Text>
						<Text style={styles.withoutCaloricPlanText}>
							Usuarios sin plan calórico:{" "}
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
		paddingTop: 20,
	},
	datesContainer: {
		paddingHorizontal: "10%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	chartContainer: {
		alignItems: "center",
	},
	resultsContainer: {
		marginTop: 20,
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
	filterDateContainer: {
		width: "45%",
	},
});
