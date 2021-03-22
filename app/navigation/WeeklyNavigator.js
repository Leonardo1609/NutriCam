import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../consts/colors";
import { MyWeekScreen } from "../screens/AuthenticatedScreens/MyWeekScreen";
import { DiarySummaryScreen } from "../screens/AuthenticatedScreens/DiarySummaryScreen";

const Stack = createStackNavigator();

export const WeeklyNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="My Week"
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.green,
				},
				headerTintColor: "white",
				headerTitleStyle: {
					fontWeight: "bold",
				},
			}}
		>
			<Stack.Screen
				name="MyWeek"
				options={{
					title: "Mi Semana",
				}}
				component={MyWeekScreen}
			/>
			<Stack.Screen
				name="DiarySummary"
				options={{
					title: "Resumen Diario",
				}}
				component={DiarySummaryScreen}
			/>
		</Stack.Navigator>
	);
};
