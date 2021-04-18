import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthNavigator } from "./AuthNavigator";
import { AuthenticatedNavigator } from "./AuthenticatedNavigator";
import { LoadingScreen } from "../screens/LoadingScreen";
import { saveIcon } from "../helpers/helpers";
import { getUser } from "../actions/authActions";

export const AppNavigator = () => {
	let token;
	const dispatch = useDispatch();
	const { userInformation, authenticated } = useSelector((state) => state.auth);

	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		const getToken = async () => {
			token = await AsyncStorage.getItem("token");

			if (token) {
				const icon = await AsyncStorage.getItem("icon");

				if (!icon) {
					await saveIcon("pan");
				}

				dispatch(getUser());
			}
		};

		getToken();
	}, [token, dispatch]);

	if (loading) return <LoadingScreen />;

	if (!loading && authenticated && userInformation?.user) return <AuthenticatedNavigator />;

	return <AuthNavigator />;
};
