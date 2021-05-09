import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/AuthenticatedScreens/HomeScreen";
import { SearchFoodScreen } from "../screens/AuthenticatedScreens/SearchFoodScreen";
import { SearchInput } from "../components/SearchInput";
import { colors } from "../consts/colors";
import { useSelector } from "react-redux";
import { FoodRegistrationScreen } from "../screens/AuthenticatedScreens/FoodRegistrationScreen";
import { MealFormScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealFormScreen";
import { MealManagementScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/MealManagmentScreen";
import { RegisterModal } from "../components/RegisterModal";
import { PosibleOptionsScreen } from "../screens/AuthenticatedScreens/PosibleOptionsScreen";
import { MotivationalMessageModal } from "../components/MotivationalMessageModal";
import { DiarySummaryScreen } from "../screens/AuthenticatedScreens/DiarySummaryScreen";
import Spinner from "react-native-loading-spinner-overlay";
import { SpinnerLoading } from "../components/SpinnerLoading";

const Stack = createStackNavigator();

export const DiaryNavigator = () => {
	const { activeFoodToRegist } = useSelector((state) => state.food);
	const { loadingRecognition } = useSelector(
		(state) => state.foodRecognition
	);

	return (
		<>
			<SpinnerLoading
				loadingCondition={loadingRecognition}
				message="Procesando..."
			/>
			<MotivationalMessageModal />
			<RegisterModal />
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
					name="PosibleOptions"
					options={{ title: "Comidas Reconocidas" }}
					component={PosibleOptionsScreen}
				/>
				<Stack.Screen
					name="SearchFood"
					options={{
						headerTitle: (props) => <SearchInput {...props} />,
					}}
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
				<Stack.Screen
					name="DiarySummary"
					options={{
						title: "Resumen",
					}}
					component={DiarySummaryScreen}
				/>
			</Stack.Navigator>
		</>
	);
};

const styles = StyleSheet.create({
	loadingText: {
		color: colors.green,
		fontSize: 30,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
});
