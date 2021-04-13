import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/AuthenticatedScreens/HomeScreen";
import { SearchFoodScreen } from "../screens/AuthenticatedScreens/SearchFoodScreen";
import { SearchInput } from "../components/SearchInput";
import { colors } from "../consts/colors";
import { useSelector } from "react-redux";
import { FoodRegistrationScreen } from "../screens/AuthenticatedScreens/FoodRegistrationScreen";
import { MealFormScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealFormScreen";
import { MealManagementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealManagmentScreen";

const Stack = createStackNavigator();

export const DiaryNavigator = () => {
	const { activeFoodToRegist } = useSelector((state) => state.food);
	return (
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
				name="Home"
				options={{ title: "Diario" }}
				component={HomeScreen}
			/>
			<Stack.Screen
				name="SearchFood"
				options={{ headerTitle: (props) => <SearchInput {...props} /> }}
				component={SearchFoodScreen}
			/>
			<Stack.Screen
				name="RegistFood"
				options={{ title: activeFoodToRegist?.food_name }}
				component={FoodRegistrationScreen}
			/>
			<Stack.Screen
				name="MealForm"
				options={{
					title: "Guardar Comida",
				}}
				component={MealFormScreen}
			/>
			<Stack.Screen
				name="MealManagement"
				options={{
					title: "Mis Comidas",
				}}
				component={MealManagementScreen}
			/>
		</Stack.Navigator>
	);
};
