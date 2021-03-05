import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import {useDispatch} from "react-redux";
import { logoutUser } from "../../actions/authActions";

export const HomeScreen = () => {
	const dispatch = useDispatch();
	const closeSession = () => {
		dispatch(logoutUser());
	};
	return (
		<View style={{ marginTop: 50 }}>
			<Text>HomeScreen</Text>
			<Button title="cerrar sesión" onPress={closeSession} />
		</View>
	);
};
