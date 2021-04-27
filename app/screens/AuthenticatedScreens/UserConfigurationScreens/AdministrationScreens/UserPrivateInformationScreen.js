import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const UserPrivateInformationScreen = () => {
	const dispatch = useDispatch();
	const { userPrivateInformation } = useSelector(
		(state) => state.administrator
	);
	console.log(userPrivateInformation);

	return (
		<View>
			<Text>UserPrivateInformationScreen</Text>
		</View>
	);
};
