import React, { useEffect, useState } from "react";
import {
	Modal,
	TouchableWithoutFeedback,
	StyleSheet,
	View,
	Text,
	Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clientAxios } from "../axios/clientAxios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setDateOfSummary } from "../actions/nutritionSummaryActions";
import { formatDate } from "../helpers/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MotivationalMessageModal = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);
	const [showMotivationalModal, setShowMotivationalModal] = useState(false);
	const [targetMessage, setTargetMessage] = useState({
		target: false,
		message: null,
	});

	const toggleModal = (bool) => {
		setShowMotivationalModal(bool);
	};

	const goToYesterdaySummary = () => {
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		setShowMotivationalModal(false);
		dispatch(setDateOfSummary(formatDate(yesterday)));
		navigation.navigate("DiarySummary");
	};

	useEffect(() => {
		const dayScheduledToShowMotivationalMessage = async () => {
			const scheduledDay = await AsyncStorage.getItem("scheduledDay");

			if (formatDate(new Date()) !== scheduledDay) {
				weekFullfiled();
				await AsyncStorage.setItem(
					"scheduledDay",
					formatDate(new Date())
				);
			}
		};

		const yesterdayFullfiled = async () => {
			try {
				const { data } = await clientAxios.get("/yesterday-fullfiled");
				setTargetMessage(data);
				if (data.has_calories) {
					setShowMotivationalModal(true);
				}
			} catch (e) {
				console.log(e.response);
				setShowMotivationalModal(false);
			}
		};

		const weekFullfiled = async () => {
			try {
				const { data } = await clientAxios("week-fullfiled");
				if (data.target) {
					setTargetMessage(data);
					setShowMotivationalModal(true);
				} else {
					yesterdayFullfiled();
				}
			} catch (e) {
				console.log(e.response);
				setShowMotivationalModal(false);
			}
		};

		// (async () => {
		// 	await AsyncStorage.removeItem(
		// 		"dayScheduledToShowMotivationalMessage"
		// 	);
		// })();
		dayScheduledToShowMotivationalMessage();
	}, []);

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showMotivationalModal}
			onRequestClose={() => toggleModal(false)}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					toggleModal(false);
				}}
			>
				<View style={styles.modalContainer}>
					<TouchableWithoutFeedback>
						<View style={styles.modalBody}>
							<View style={styles.closeButtonContainer}>
								<TouchableWithoutFeedback
									onPress={() => toggleModal(false)}
								>
									<Ionicons name="close-outline" size={35} />
								</TouchableWithoutFeedback>
							</View>
							{targetMessage.target && (
								<Image
									style={styles.medalImage}
									source={require("../assets/images/congratulations.png")}
								/>
							)}
							<Text style={styles.greetsText}>
								Hola {userInformation?.user?.user_name}
							</Text>
							<Text style={styles.motivationalMessageText}>
								{targetMessage.message}
							</Text>
							<View style={styles.buttonContainer}>
								<TouchableWithoutFeedback
									onPress={() => goToYesterdaySummary()}
								>
									<Text style={styles.buttonText}>
										Ver Resumen de ayer
									</Text>
								</TouchableWithoutFeedback>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalBody: {
		backgroundColor: "white",
		position: "relative",
		width: "80%",
		height: "60%",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	motivationalMessageText: {
		fontFamily: "poppins-bold",
		fontSize: 20,
		textAlign: "center",
	},
	medalImage: {
		width: 150,
		height: 150,
		resizeMode: "contain",
	},
	greetsText: {
		fontSize: 20,
		fontFamily: "poppins-bold",
		textAlign: "center",
		marginVertical: 10,
	},
	closeButtonContainer: {
		position: "absolute",
		top: 10,
		right: 10,
	},
	buttonContainer: {
		position: "absolute",
		bottom: 30,
		right: 20,
		flexDirection: "row",
	},
	closeTextButtonContainer: {
		marginRight: 15,
	},
	buttonText: {
		fontSize: 18,
		color: "#3d5af1",
		fontWeight: "bold",
	},
});
