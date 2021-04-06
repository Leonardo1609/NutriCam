import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { EnterUserDataForm } from "../../components/EnterUserDataForm";
import { useNavigation } from "@react-navigation/native";
import { indications } from "../../consts/consts";
import {
	setHealthyData,
	getHealthyInformation,
} from "../../actions/createAccountProcessActions";
import { useDispatch } from "react-redux";

export const EnterUserData = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const submit = (...args) => {
		dispatch(setHealthyData(...args));
		dispatch(getHealthyInformation());

		navigation.navigate({
			name: "Results",
		});
	};

	return (
		<EnterUserDataForm submitFn={submit} buttonText="Siguiente">
			<View style={styles.indicationsContainer}>
				<Text style={styles.indications}>{indications}</Text>
			</View>
		</EnterUserDataForm>
	);
};

const styles = StyleSheet.create({
	indications: {
		fontSize: Dimensions.get("window").width > 350 ? 16 : 12,
		fontFamily: "poppins",
	},
	indicationsContainer: {
		marginVertical: Dimensions.get("window").height > 600 ? 20 : 8,
	},
});
