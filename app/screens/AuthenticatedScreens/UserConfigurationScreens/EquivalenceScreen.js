import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { equivalenceMessage } from "../../../consts/consts";
import { icons } from "../../../helpers/helpers";

export const EquivalenceScreen = () => {
	const setIcon = async (icon) => {
		await AsyncStorage.setItem("icon", JSON.stringify(icon));
	};

	return (
		<View style={styles.screen}>
			{icons.map((icon) => (
				<TouchableWithoutFeedback
					key={icon.iconName}
					onPress={setIcon.bind(this, icon)}
				>
					<View>
						<Text>{icon.iconName}</Text>
						<Text>{icon.foodCalories}</Text>
					</View>
				</TouchableWithoutFeedback>
			))}
			<Text>{equivalenceMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
});
