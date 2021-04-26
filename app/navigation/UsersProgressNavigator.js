import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { QuantityUsersImprovementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/QuantityUsersImprovementScreen";

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
		</Stack.Navigator>
	);
};
