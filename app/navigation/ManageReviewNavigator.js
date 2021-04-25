import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ManageReviewsScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/ManageReviewsScreen";
import { AllReviewsScreen } from "../screens/AuthenticatedScreens/UserConfigurationScreens/AdministrationScreens/AllReviewsScreen";

const Stack = createStackNavigator();

export const ManageReviewNavigator = () => {
	return (
		<Stack.Navigator
			initialRouteName="ReviewsQuantity"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="ReviewsQuantity"
				component={ManageReviewsScreen}
			/>
			<Stack.Screen name="AllReviews" component={AllReviewsScreen} />
		</Stack.Navigator>
	);
};
