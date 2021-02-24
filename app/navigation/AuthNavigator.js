import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAccountMainForm } from "../screens/CreateAccountScreens/CreateAccountMainForm";
import { AskForNutritionalPlan } from "../screens/CreateAccountScreens/AskForNutritionalPlan";
import { EnterUserData } from "../screens/CreateAccountScreens/EnterUserData";
import { FirstScreen } from "../screens/FirstScreen";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="FirstScreen"
				screenOptions={{
					headerStyle: {
						backgroundColor: "#FF9400",
					},
					headerTintColor: "white",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen
					options={{ headerShown: false }}
					name="FirstScreen"
					component={FirstScreen}
				/>
				<Stack.Screen
					options={{
						title: "Crear Cuenta",
					}}
					name="CreateAccount"
					component={CreateAccountMainForm}
				/>
				<Stack.Screen
					name="AskForNutritionalPlan"
					options={{ title: "Crear Plan Nutricional" }}
					component={AskForNutritionalPlan}
				/>
		<Stack.Screen 
			name="EnterUserData"
			options={{ title: 'Ingreso de Datos' }}
			component={ EnterUserData }
		/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

