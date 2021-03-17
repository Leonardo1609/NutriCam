import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../actions/authActions";
import { AuthNavigator } from "./AuthNavigator";
import { AuthenticatedNavigator } from "./AuthenticatedNavigator";
import { LoadingScreen } from "../screens/LoadingScreen";
import { saveIcon } from "../helpers/helpers";

export const AppNavigator = () => {
	let token;
	const dispatch = useDispatch();
	const { authenticated } = useSelector((state) => state.auth);

	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		const getToken = async () => {
			token = await AsyncStorage.getItem("token");
			if (token) {
				dispatch(getUser());

				if (await !AsyncStorage.getItem("icon")) {
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
