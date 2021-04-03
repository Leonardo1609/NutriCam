import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CreateAccountMainForm } from "../screens/CreateAccountScreens/CreateAccountMainForm";
import { AskForCaloricPlan } from "../screens/CreateAccountScreens/AskForCaloricPlan";
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
					name="CreateAccount"
					options={{
						title: "Crear Cuenta",
					}}
					component={CreateAccountMainForm}
				/>
				<Stack.Screen
					name="AskForCaloricPlan"
					options={{ title: "Crear Plan Calórico" }}
					component={AskForCaloricPlan}
				/>
				<Stack.Screen
					name="EnterUserData"
					options={{ title: "Ingreso de Datos" }}
					component={EnterUserData}
				/>
				<Stack.Screen
					name="Results"
					options={{
						title: "Resultados IMC",
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
