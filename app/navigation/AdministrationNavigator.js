import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen } from "../screens/AuthenticatedScreens/HomeScreen";
import { colors } from "../consts/colors";
import { StatisticsScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/StatisticsScreen";
import { ManageReviewNavigator } from "./ManageReviewNavigator";
import { UsersProgressNavigator } from "./UsersProgressNavigator";

const Tab = createMaterialTopTabNavigator();

export const AdministrationNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="Statistics"
			tabBarOptions={{
				activeTintColor: colors.green,
				inactiveTintColor: "#3f3b3b",
				indicatorStyle: { backgroundColor: colors.green, height: 3 },
				labelStyle: {
					fontFamily: "poppins-bold",
					fontSize: 12,
				},
			}}
		>
			<Tab.Screen
				name="Statistics"
				component={StatisticsScreen}
				options={{
					tabBarLabel: "Estadísticas",
				}}
			/>
			<Tab.Screen
				name="Reviews"
				component={ManageReviewNavigator}
				options={{ tabBarLabel: "Reseñas" }}
			/>
			<Tab.Screen
				name="Users"
				component={UsersProgressNavigator}
				options={{ tabBarLabel: "Usuarios" }}
			/>
		</Tab.Navigator>
	);
};
