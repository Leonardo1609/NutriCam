import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../consts/colors";
import { UserConfigurationMainScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/UserConfigurationHomeScreen";
import { EquivalenceScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/EquivalenceScreen";
import { MealManagementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealManagmentScreen";

const Stack = createStackNavigator();

export const UserConfigurationNavigator = () => (
	<Stack.Navigator
		initialRouteName="Home"
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
			name="MyAccount"
			options={{
				title: "Mi Cuenta",
			}}
			component={UserConfigurationMainScreen}
		/>
		<Stack.Screen
			name="MealManagement"
			options={{
				title: "Comidas",
			}}
			component={MealManagementScreen}
		/>
		<Stack.Screen
			name="Equivalence"
			options={{
				title: "Alimento de Equivalencia",
			}}
			component={EquivalenceScreen}
		/>
	</Stack.Navigator>
);
