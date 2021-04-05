import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import { UserConfigurationMainScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/UserConfigurationHomeScreen";
import { GeneralConfigurationScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/GeneralConfigurationScreen";
import { EquivalenceScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/EquivalenceScreen";
import { MealManagementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealManagmentScreen";
import { MealFormScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealFormScreen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setActiveOwnFood } from "../actions/foodActions";
import { ReviewRatingScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/ReviewRatingScreen";
import { ChangeEmailForm } from "../screens/AuthenticatedScreens/UserConfigurationScreens/ChangeEmailForm";
import { ScheduleManagement } from "../screens/AuthenticatedScreens/UserConfigurationScreens/ScheduleManagement";
import { ChangePasswordFormScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/ChangePasswordFormScreen";
import { MyDataScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MyDataScreen";

const Stack = createStackNavigator();

export const UserConfigurationNavigator = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const navToMealForm = () => {
		dispatch(setActiveOwnFood(null));
		navigation.navigate("MealForm");
	};

	return (
		<Stack.Navigator
			initialRouteName="MyAccount"
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
				name="MyData"
				options={{
					title: "Mis datos",
				}}
				component={MyDataScreen}
			/>
			<Stack.Screen
				name="GeneralConfiguration"
				options={{
					title: "Ajustes Generales",
				}}
				component={GeneralConfigurationScreen}
			/>
			<Stack.Screen
				name="ChangeEmail"
				options={{
					title: "Cambiar Correo",
				}}
				component={ChangeEmailForm}
			/>
			<Stack.Screen
				name="ChangePassword"
				options={{
					title: "Cambiar Contraseña",
				}}
				component={ChangePasswordFormScreen}
			/>
			<Stack.Screen
				name="MealManagement"
				options={{
					title: "Mis Comidas",
					headerRight: () => (
						<View style={styles.iconContainer}>
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={navToMealForm}
							>
								<Ionicons
									name="ios-add-circle"
									style={styles.icon}
								/>
							</TouchableOpacity>
						</View>
					),
				}}
				component={MealManagementScreen}
			/>
			<Stack.Screen
				name="ScheduleManagement"
				options={{
					title: "Horario",
				}}
				component={ScheduleManagement}
			/>
			<Stack.Screen
				name="Equivalence"
				options={{
					title: "Alimento de Equivalencia",
				}}
				component={EquivalenceScreen}
			/>
			<Stack.Screen
				name="MealForm"
				options={{
					title: "Guardar Comida",
				}}
				component={MealFormScreen}
			/>
			<Stack.Screen
				name="ReviewRating"
				options={{
					title: "Reseñar/Puntuar",
				}}
				component={ReviewRatingScreen}
			/>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	iconContainer: {
		paddingHorizontal: 12,
		justifyContent: "center",
	},
	icon: { fontSize: 35, color: "white" },
});
