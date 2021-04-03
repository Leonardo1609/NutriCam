import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import { equivalenceMessage } from "../../../consts/consts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "../../../helpers/helpers";
import { useEffect } from "react";
import { colors } from "../../../consts/colors";

export const EquivalenceScreen = () => {
	const [iconSelected, setIconSelected] = useState(null);

	const setIcon = async (icon) => {
		await AsyncStorage.setItem("icon", JSON.stringify(icon));
		setIconSelected(icon);
	};

	const setIconImage = (iconName) => {
		switch (iconName) {
			case "pan":
				return require("../../../assets/images/icons/bread.png");
			case "cerveza":
				return require("../../../assets/images/icons/beer.png");
			case "dona":
				return require("../../../assets/images/icons/donut.png");
			case "gaseosa":
				return require("../../../assets/images/icons/soda.png");
			default:
				return require("../../../assets/images/icons/bread.png");
		}
	};

	useEffect(() => {
		const getIcon = async () => {
			const icon = await AsyncStorage.getItem("icon");
			setIconSelected(JSON.parse(icon));
		};
		getIcon();
	}, []);

	return (
		<View style={styles.screen}>
			<View style={styles.iconsContainer}>
				{icons.map((icon) => (
					<TouchableWithoutFeedback
						key={icon.iconName}
						onPress={setIcon.bind(this, icon)}
					>
						<View style={styles.iconContainer}>
							<View style={styles.iconImageContainer}>
								<Image
									style={styles.iconImage}
									source={setIconImage(icon.iconName)}
								/>
							</View>
							<Text
								style={{
									...styles.iconName,
									color:
										iconSelected?.iconName === icon.iconName
											? colors.green
											: "black",
								}}
							>
								{icon.iconName.toUpperCase()}
							</Text>
							<Text
								style={{
									...styles.iconCalories,
									color:
										iconSelected?.iconName === icon.iconName
											? colors.green
											: "black",
								}}
							>
								{icon.foodCalories} cal
							</Text>
						</View>
					</TouchableWithoutFeedback>
				))}
			</View>
			<Text style={styles.message}>{equivalenceMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	iconsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	iconContainer: {
		width: "50%",
		alignItems: "center",
		justifyContent: "center",
		height: 200,
	},
	iconImageContainer: {
		width: 100,
		height: 100,
	},
	iconImage: {
		resizeMode: "contain",
		width: "100%",
		height: "100%",
	},
	iconName: {
		marginTop: 10,
		fontFamily: "poppins-bold",
		fontSize: 16,
	},
	iconCalories: {
		fontFamily: "poppins-bold",
		fontSize: 16,
	},
	message: {
		marginTop: 30,
		fontFamily: "poppins-bold",
		fontSize: 16
	}
});
