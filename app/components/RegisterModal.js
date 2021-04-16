import React, { useState } from "react";
import {
	Modal,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setShowRegisterModal } from "../actions/uiActions";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { startSendImage } from "../actions/foodRecognitionActions";

export const RegisterModal = () => {
	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(
			Permissions.CAMERA,
			Permissions.CAMERA_ROLL
		);
		if (result.status !== "granted") {
			Alert.alert(
				"Permiso denegado",
				"No podrá hacer uso del reconocimiento de comidas si no acepta los permisos",
				[{ text: "Entendido" }]
			);
			return false;
		}

		return true;
	};

	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { showRegisterModal } = useSelector((state) => state.ui);

	const navToPosibleOptions = () => {
		navigation.navigate("PosibleOptions");
	};

	const takeFoodPhoto = async () => {
		dispatch(setShowRegisterModal(false));
		const permissions = await verifyPermissions();
		if (!permissions) {
			return;
		}
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});
		dispatch(startSendImage(image, navToPosibleOptions));
	};

	const uploadFoodPhoto = async () => {
		dispatch(setShowRegisterModal(false));
		const permissions = await verifyPermissions();
		if (!permissions) {
			return;
		}

		const image = await ImagePicker.launchImageLibraryAsync();
		dispatch(startSendImage(image, navToPosibleOptions));
	};

	const toggleModal = (bool) => {
		dispatch(setShowRegisterModal(bool));
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={showRegisterModal}
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
							<View style={styles.iconsContainer}>
								<View style={styles.iconContainer}>
									<TouchableOpacity
										activeOpacity={0.5}
										onPress={takeFoodPhoto}
									>
										<Ionicons
											name="camera-outline"
											size={50}
										/>
									</TouchableOpacity>
								</View>
								<View style={styles.iconContainer}>
									<TouchableOpacity
										activeOpacity={0.5}
										onPress={uploadFoodPhoto}
									>
										<Ionicons
											name="image-outline"
											size={50}
										/>
									</TouchableOpacity>
								</View>
								<View style={styles.iconContainer}>
									<TouchableOpacity
										activeOpacity={0.5}
										onPress={() => {
											dispatch(
												setShowRegisterModal(false)
											);
											navigation.navigate("SearchFood");
										}}
									>
										<Ionicons
											name="search-outline"
											size={50}
										/>
									</TouchableOpacity>
								</View>
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
	iconsContainer: {
		width: "100%",
		justifyContent: "center",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	iconContainer: {
		width: 100,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
		margin: 15,
		borderWidth: 5,
		borderColor: "green",
		borderRadius: 100,
	},

	closeButtonContainer: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});
