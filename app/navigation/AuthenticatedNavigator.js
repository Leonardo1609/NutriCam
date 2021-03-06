import React from "react";
import { Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/AuthenticatedScreens/HomeScreen";
import { colors } from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator()
		: createBottomTabNavigator();

export const AuthenticatedNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Home"
				barStyle={{ backgroundColor: colors.green, paddingVertical: 5 }}
				activeColor="white"
				shifting={false}
				inactiveColor="#e3e3e3"
				screenOptions={({ route }) => ({
					tabBarIcon: ({ _, color }) => {
						let iconName;
						let size = 24;

						if (route.name === "Diario") {
							iconName = "ios-list";
						} else if (route.name === "Semana") {
							iconName = "ios-bar-chart";
						} else if (route.name === "Search") {
							iconName = "ios-add-circle";
							size = 28;
						} else if (route.name === "Plan") {
							iconName = "ios-calendar-outline";
						} else if (route.name === "Yo") {
							iconName = "ios-person-outline";
						}

						return (
							<Ionicons
								name={iconName}
								size={size}
								color={color}
							/>
						);
					},
					tabBarLabel:
						Platform.OS === "android" ? (
							<Text
								style={{
									fontSize: 12,
									fontFamily: "poppins-bold",
								}}
							>
								{route.name !== "Search" ? route.name : null}
							</Text>
						) : route.name !== "Search" ? (
							route.name
						) : '',
				})}
				tabBarOptions={{
					activeTintColor: colors.green,
					inactiveTintColor: colors.grayPlaceholder,
					labelStyle: { fontSize: 12, fontFamily: "poppins-bold" },
				}}
			>
				<Tab.Screen name="Semana" component={HomeScreen} />
				<Tab.Screen name="Diario" component={HomeScreen} />
				<Tab.Screen name="Search" component={HomeScreen} />
				<Tab.Screen name="Plan" component={HomeScreen} />
				<Tab.Screen name="Yo" component={HomeScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
