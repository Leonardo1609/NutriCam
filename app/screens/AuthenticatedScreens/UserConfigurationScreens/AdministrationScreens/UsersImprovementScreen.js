import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
	setUsersImprovement,
	startGetUserPrivateInformation,
	startGetUsersImprovement,
} from "../../../../actions/administratorActions";
import PickerSelect from "react-native-picker-select";
import { improvementFilters } from "../../../../helpers/helpers";
import { colors } from "../../../../consts/colors";
import { MainButton } from "../../../../components/MainButton";
import { debounce } from "lodash";

const pickerStyle = () => ({
	placeholder: {
		color: colors.grayPlaceholder,
	},
	inputAndroid: {
		color: "black",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
	inputIOS: {
		color: "black",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
});

export const UsersImprovementScreen = () => {
	const setWeightLevelColor = (w_level_id) => {
		if (w_level_id === 2) return colors.green;
		return "red";
	};

	const renderUsers = ({ item }) => {
		return (
			<TouchableOpacity
				activeOpacity={0.6}
				onPress={() => goToUserPrivateInformation(item.user_id)}
			>
				<View style={styles.userCardContainer}>
					<View style={styles.cardRow}>
						<View style={styles.userNameContainer}>
							<Text numberOfLines={1} style={styles.userName}>
								{item.user_name}
							</Text>
						</View>
						<View style={styles.userEmailContainer}>
							<Text numberOfLines={1} style={styles.userEmail}>
								{item.user_email}
							</Text>
						</View>
					</View>
					<View style={styles.cardRow}>
						<Text
							style={{
								...styles.weightLevelName,
								color: setWeightLevelColor(item.w_level_id),
							}}
						>
							Nivel de peso: {item.w_level_name}
						</Text>
					</View>
					<View style={styles.cardRow}>
						<Text style={styles.previousIMC}>
							IMC previo: {item.profile_previous_imc}{" "}
						</Text>
						<Text style={styles.currentIMC}>
							IMC actual: {item.profile_current_imc}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [scenario, setScenario] = useState(null);
	const { usersImprovement } = useSelector((state) => state.administrator);

	const navToUserPrivateInformation = () => {
		navigation.navigate("UserPrivateInformation");
	};

	const goToUserPrivateInformation = (user_id) => {
		dispatch(
			startGetUserPrivateInformation(user_id, navToUserPrivateInformation)
		);
	};

	const confirmScenario = (value) => {
		setScenario(value);
	};

	const handleInputSearch = debounce((value) => {
		if (value) {
			dispatch(startGetUsersImprovement(null, value));
		} else {
			dispatch(startGetUsersImprovement());
		}
	}, 1000);

	const goBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		if (scenario !== "search") {
			dispatch(startGetUsersImprovement(scenario, null));
		}
	}, [scenario]);

	useEffect(() => {
		return () => {
			handleInputSearch.cancel();
			dispatch(setUsersImprovement([]));
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				<View style={styles.filterContainer}>
					<PickerSelect
						style={pickerStyle()}
						value={scenario}
						placeholder={{
							label: "Seleccionar Filtro",
							value: null,
						}}
						useNativeAndroidPickerStyle={false}
						onValueChange={confirmScenario}
						items={[...improvementFilters.keys()].map(
							(filterKey) => ({
								label: improvementFilters.get(filterKey),
								value: filterKey,
							})
						)}
					/>
				</View>
				{scenario === "search" && (
					<TextInput
						style={styles.input}
						onChangeText={handleInputSearch}
						placeholder="Buscar usuario"
					/>
				)}
				{usersImprovement && usersImprovement.length > 0 ? (
					<View style={styles.listContainer}>
						<FlatList
							keyExtractor={(item) => item.user_id.toString()}
							data={usersImprovement}
							renderItem={renderUsers}
						/>
					</View>
				) : (
					<Text style={styles.notFoundUsers}>
						No se encontraron usuarios
					</Text>
				)}
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={goBack}
				>
					Volver
				</MainButton>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	filterContainer: {
		marginVertical: 10,
	},
	listContainer: {
		marginVertical: 10,
		flex: 1,
	},
	userCardContainer: {
		borderWidth: 1,
		borderColor: colors.grayPlaceholder,
		borderRadius: 10,
		marginVertical: 5,
		padding: 5,
	},
	cardRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 5,
	},
	weightLevelName: {
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	userNameContainer: {
		flex: 1,
	},
	userName: {
		fontSize: 14,
		fontFamily: "poppins-bold",
	},
	userEmailContainer: {
		flex: 2,
	},
	userEmail: {
		fontSize: 14,
		fontFamily: "poppins",
		textAlign: "right",
	},
	previousIMC: {
		fontSize: 14,
		fontFamily: "poppins",
		flex: 1,
	},
	currentIMC: {
		fontSize: 14,
		fontFamily: "poppins",
		flex: 1,
		textAlign: "right",
	},
	buttonContainer: {
		marginVertical: 15,
	},
	notFoundUsers: {
		fontSize: 18,
		fontFamily: "poppins-bold",
		textAlign: "center",
		marginVertical: 10,
	},
	input: {
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
		fontSize: 16,
	},
});
