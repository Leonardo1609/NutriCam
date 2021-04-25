import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { EnterUserData } from "../screens/CreateAccountScreens/EnterUserData";
import { Results } from "../screens/CreateAccountScreens/Results";
import { CaloricPlanResultCalculator } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/CaloricPlanResultCalculator";

const Stack = createStackNavigator();

export const CalculatorNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="UserDate"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="UserDate" component={EnterUserData} />
			<Stack.Screen name="Results" component={Results} />
			<Stack.Screen
				name="CaloricPlanResult"
				component={CaloricPlanResultCalculator}
			/>
		</Stack.Navigator>
	);
};
