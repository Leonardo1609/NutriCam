import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { nutritionMessage, question } from "../../consts/consts";
import { MainButton } from "../../components/MainButton";
import { useNavigation } from "@react-navigation/native";

export const AskForNutritionalPlan = () => {
	const navigation = useNavigation();

	const acceptCreateNutritionalPlan = () => {
		navigation.navigate("EnterUserData");
	};
	return (
		<View style={styles.screen}>
			<Image
				style={styles.imageContainer}
				source={require("../../assets/images/nutrition-image.png")}
			/>
			<View style={styles.nutritionMessageContainer}>
				<Text style={styles.message} numberOfLines={3}>
					{nutritionMessage}
				</Text>
			</View>
			<View style={styles.questionContainer}>
				<Text style={styles.question} numberOfLines={3}>
					{question}
				</Text>
			</View>
			<MainButton onPress={acceptCreateNutritionalPlan}>Sí</MainButton>
			<MainButton>Omitir</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "space-around",
		paddingVertical: Dimensions.get("window").height > 600 ? "10%" : 0,
	},
	imageContainer: {
		width: Dimensions.get("window").height < 600 ? 150 : 200,
		height: Dimensions.get("window").height < 600 ? 150 : 200,
	},
	nutritionMessageContainer: {
		width: "80%",
	},
	questionContainer: {
		width: "80%",
	},
	message: {
		fontSize: Dimensions.get("window").height < 600 ? 18 : 22,
		textAlign: "center",
	},
	question: {
		fontSize: Dimensions.get("window").height < 600 ? 18 : 22,
		textAlign: "center",
		fontWeight: "bold",
	},
});
