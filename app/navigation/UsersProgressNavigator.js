import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { QuantityUsersImprovementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/QuantityUsersImprovementScreen";
import { UsersImprovementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/UsersImprovementScreen";
import { UserPrivateInformationScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/UserPrivateInformationScreen";
import { UserRegistersScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/UserRegistersScreen";
import { UserNutritionSummaryScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/UserNutritionSummaryScreen";

const Stack = createStackNavigator();

export const UsersProgressNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName="UserStatistics"
		>
			<Stack.Screen
				name="UserStatistics"
				component={QuantityUsersImprovementScreen}
			/>
			<Stack.Screen
				name="UsersImprovement"
				component={UsersImprovementScreen}
			/>
			<Stack.Screen
				name="UserPrivateInformation"
				component={UserPrivateInformationScreen}
			/>
			<Stack.Screen
				name="UserRegisters"
				component={UserRegistersScreen}
			/>
			<Stack.Screen
				name="UserSummary"
				component={UserNutritionSummaryScreen}
			/>
		</Stack.Navigator>
	);
};
