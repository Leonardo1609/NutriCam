import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthNavigator } from "./AuthNavigator";
import { AuthenticatedNavigator } from "./AuthenticatedNavigator";
import { LoadingScreen } from "../screens/LoadingScreen";
import { saveIcon } from "../helpers/helpers";

export const AppNavigator = () => {
	let token;
	const { authenticated } = useSelector((state) => state.auth);

	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		const getToken = async () => {
			token = await AsyncStorage.getItem("token");
			if (token) {
				const icon = await AsyncStorage.getItem("icon");

				if (!icon) {
					await saveIcon("pan");
				}
			}
		};

		getToken();
	}, [token]);

	if (loading) return <LoadingScreen />;

	if (!loading && authenticated) return <AuthenticatedNavigator />;

	return <AuthNavigator />;
};
