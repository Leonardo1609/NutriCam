import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AuthNavigator } from "./AuthNavigator";
import { AuthenticatedNavigator } from "./AuthenticatedNavigator";
// import { LoadingScreen } from "../screens/LoadingScreen";
import { saveIcon } from "../helpers/helpers";
import { getUser } from "../actions/authActions";
import Spinner from "react-native-loading-spinner-overlay";
import { colors } from "../consts/colors";

export const AppNavigator = () => {
	let token;
	const dispatch = useDispatch();
	const { userInformation, authenticated } = useSelector(
		(state) => state.auth
	);

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

	if (loading)
		return (
			<Spinner
				visible={loading}
				textContent="Cargando..."
				textStyle={styles.loadingText}
				color={colors.green}
				overlayColor="rgba(0,0,0, 0.6)"
			/>
		);

	if (!loading && authenticated && userInformation?.user)
		return <AuthenticatedNavigator />;

	return <AuthNavigator />;
};

const styles = StyleSheet.create({
	loadingText: {
		color: colors.green,
		fontSize: 30,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
});
