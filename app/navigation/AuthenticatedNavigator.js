import React, { useEffect } from "react";
import { Alert, Platform, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DiaryNavigator } from "./DiaryNavigator";
import { WeeklyNavigator } from "./WeeklyNavigator";
import { UserConfigurationNavigator } from "./UserConfigurationNavigator";
import { useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { clientAxios } from "../axios/clientAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { startGetSchedule } from "../actions/scheduleActions";
import { setShowRegisterModal } from "../actions/uiActions";
import { getPartOfHour, reminderMessages } from "../helpers/helpers";

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true,
		};
	},
});

const Tab =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator()
		: createBottomTabNavigator();

export const AuthenticatedNavigator = () => {
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);
	const { schedule } = useSelector((state) => state.schedule);

	const getRecommendation = async () => {
		const { data } = await clientAxios("/expert-recommendation");
		Notifications.scheduleNotificationAsync({
			content: {
				title: "Consejo del día:",
				body: data.recommendation,
			},
			trigger: {
				hour: 10,
				minute: 0,
				repeats: true,
			},
		});
	};

	const setReminder = async (day_food_id, meal_time) => {
		const identifier = await Notifications.scheduleNotificationAsync({
			content: {
				title: "Nutri Recordatorio",
				body: reminderMessages[day_food_id - 1],
			},
			trigger: {
				hour: getPartOfHour(meal_time, "hours"),
				minute: getPartOfHour(meal_time, "minutes"),
				repeats: true,
			},
		});
		return identifier;
	};

	const getReminder = async (day_food_id, meal_time) => {
		const reminder = await AsyncStorage.getItem(`reminder ${day_food_id}`);
		if (!reminder && day_food_id && meal_time) {
			const identifier = await setReminder(day_food_id, meal_time);
			await AsyncStorage.setItem(
				`reminder ${day_food_id}`,
				JSON.stringify({
					hour: meal_time,
					identifier,
				})
			);
		} else if (reminder && day_food_id && meal_time) {
			const { hour, identifier } = JSON.parse(reminder);
			if (hour !== meal_time) {
				await Notifications.cancelScheduledNotificationAsync(
					identifier
				);
				const newIdentifier = await setReminder(day_food_id, meal_time);
				await AsyncStorage.setItem(
					`reminder ${day_food_id}`,
					JSON.stringify({
						hour: meal_time,
						identifier: newIdentifier,
					})
				);
			}
		} else if (reminder && !meal_time && day_food_id) {
			const { identifier } = JSON.parse(reminder);
			await AsyncStorage.removeItem(`reminder ${day_food_id}`);
			await Notifications.cancelScheduledNotificationAsync(identifier);
		}
	};

	useEffect(() => {
		dispatch(startGetSchedule());
	}, []);

	useEffect(() => {
		Permissions.getAsync(Permissions.NOTIFICATIONS)
			.then((statusObj) => {
				if (statusObj.status !== "granted") {
					return Permissions.askAsync(Permissions.NOTIFICATIONS);
				}
				return statusObj;
			})
			.then((statusObj) => {
				if (statusObj.status !== "granted") {
					return;
				}
			});
	}, []);

	useEffect(() => {
		const subscribtion = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log(response);
			}
		);

		return () => {
			subscribtion.remove();
		};
	}, []);

	useEffect(() => {
		const setDay = async () => {
			// await AsyncStorage.removeItem("dayOfDate");
			let day = await AsyncStorage.getItem("dayOfDate");
			day = JSON.parse(day);

			if (!day) {
				await AsyncStorage.setItem(
					"dayOfDate",
					JSON.stringify(new Date().getDate())
				);
			}

			if (day === new Date().getDate()) {
				await getRecommendation();
				await AsyncStorage.setItem(
					"dayOfDate",
					JSON.stringify(new Date().getDate() + 1)
				);
			} else {
				console.log("already programmed");
			}
		};

		setDay();
	}, []);

	useEffect(() => {
		if (schedule.length) {
			schedule.forEach(({ day_food_id, meal_time }) => {
				getReminder(day_food_id, meal_time);
			});
		}
	}, [schedule]);

	return (
		<>
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName="Diario"
					barStyle={{ backgroundColor: colors.green }}
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
							} else if (route.name === "Registrar") {
								iconName = "ios-add-circle";
							} else if (route.name === "Plan") {
								iconName = "ios-calendar-outline";
							} else if (route.name === "Yo") {
								iconName = "ios-person-circle-outline";
							}

							return (
								<Ionicons
									name={iconName}
									size={size}
									color={color}
								/>
							);
						},
						tabBarLabel: (
							<Text
								style={{
									fontSize: 12,
									fontFamily: "poppins-bold",
								}}
							>
								{route.name}
							</Text>
						),
					})}
					tabBarOptions={{
						activeTintColor: colors.green,
						inactiveTintColor: colors.grayPlaceholder,
						labelStyle: {
							fontSize: 12,
							fontFamily: "poppins-bold",
						},
					}}
				>
					<Tab.Screen
						name="Semana"
						component={WeeklyNavigator}
						listeners={({ navigation, route }) => ({
							tabPress: (e) => {
								if (
									!userInformation?.profile
										?.profile_have_caloric_plan
								) {
									e.preventDefault();
									return Alert.alert(
										"No permitido",
										"Solo puede ingresar si cuenta con un plan calórico"
									);
								}

								// To always navigate to the main screen of the TapScreen (MyWeek). Need the if because in this NavigationContainer MyWeek route doesn't exists when the app is initialized.
								if (route.state) {
									e.preventDefault();
									navigation.navigate("MyWeek");
								}
							},
						})}
					/>
					<Tab.Screen
						name="Diario"
						component={DiaryNavigator}
						listeners={({ navigation, route }) => ({
							tabPress: (e) => {
								if (route.state) {
									e.preventDefault();
									navigation.navigate("Home");
								}
							},
						})}
					/>
					<Tab.Screen
						name="Registrar"
						component={DiaryNavigator}
						listeners={({ navigation }) => ({
							tabPress: (e) => {
								e.preventDefault();
								dispatch(setShowRegisterModal(true));
								navigation.navigate("Diario");
							},
						})}
					/>
					<Tab.Screen
						name="Yo"
						component={UserConfigurationNavigator}
						listeners={({ navigation, route }) => ({
							tabPress: (e) => {
								if (route.state) {
									e.preventDefault();
									navigation.navigate("MyAccount");
								}
							},
						})}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</>
	);
};
