import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAccountMainForm } from "../screens/CreateAccountScreens/CreateAccountMainForm";
import { AskForNutritionalPlan } from "../screens/CreateAccountScreens/AskForNutritionalPlan";
import { Results } from "../screens/CreateAccountScreens/Results";
import { EnterUserData } from "../screens/CreateAccountScreens/EnterUserData";
import { CaloricPlanResult } from "../screens/CreateAccountScreens/CaloricPlanResult";
import { LoginForm } from "../screens/LoginScreen/LoginForm";
import { FirstScreen } from "../screens/FirstScreen";
import { colors } from "../consts/colors";

const Stack = createStackNavigator();

export const AuthNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="FirstScreen"
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
					options={{ headerShown: false }}
					name="FirstScreen"
					component={FirstScreen}
				/>
				<Stack.Screen
					name="Login"
					options={{ title: "Iniciar Sesión" }}
					component={LoginForm}
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
					options={{ title: "Ingreso de Datos" }}
					component={EnterUserData}
				/>
				<Stack.Screen
					name="Results"
					options={{
						title: "Resultados",
					}}
					component={Results}
				/>
				<Stack.Screen
					name="CaloricPlanResult"
					options={{
						title: "Plan Calórico",
					}}
					component={CaloricPlanResult}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
