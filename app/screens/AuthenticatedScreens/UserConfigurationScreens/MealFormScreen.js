import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
	startCreateFood,
	startRemoveOwnfood,
	startUpdateOwnFood,
} from "../../../actions/foodActions";
import { MainButton } from "../../../components/MainButton";
import { colors } from "../../../consts/colors";
import { createFoodValidation } from "../../../validations/createFoodValidation";
import PickerSelect from "react-native-picker-select";
import { measureUnitMap } from "../../../helpers/helpers";
import { AlertMessage } from "../../../components/AlertMessage";
import { ErrorText } from "../../../components/ErrorText";

const errorColor = (error) => (error ? "red" : "black");

export const MealFormScreen = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const navToMealsManagement = () => {
		navigation.navigate("MealManagement");
	};

	const { activeOwnFood } = useSelector((state) => state.food);
	const { messageWarning } = useSelector((state) => state.ui);

	const [foodName, setFoodName] = useState("");
	const [measureUnit, setMeasureUnit] = useState("");
	const [foodCalories, setFoodCalories] = useState(null);
	const [foodCarbohydrates, setFoodCarbohydrates] = useState(null);
	const [foodFats, setFoodFats] = useState(null);
	const [foodProteins, setFoodProteins] = useState(null);
	const [errors, setErrors] = useState({});
	const [formSubmit, setFormSubmit] = useState(false);

	const pickerStyle = (error = null) => ({
		placeholder: {
			color: colors.grayPlaceholder,
		},
		inputAndroid: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: error ? "red" : "black",
			paddingVertical: 5,
		},
		inputIOS: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: error ? "red" : "black",
			paddingVertical: 5,
		},
	});

	const handleMeasureUnit = (value) => {
		setMeasureUnit(value);
	};

	const handleCalories = (caloriesValue) => {
		const regCalories = /^\d*\.?\d*$/;
		if (regCalories.test(caloriesValue)) {
			setFoodCalories(caloriesValue);
		}
	};

	const handleCarbohydrates = (carbohydratesValue) => {
		const regCarbohydrates = /^\d*\.?\d*$/;
		if (regCarbohydrates.test(carbohydratesValue)) {
			setFoodCarbohydrates(carbohydratesValue);
		}
	};

	const handleFats = (fatsValue) => {
		const regFats = /^\d*\.?\d*$/;
		if (regFats.test(fatsValue)) {
			setFoodFats(fatsValue);
		}
	};

	const handleProteins = (proteinsValue) => {
		const regProteins = /^\d*\.?\d*$/;
		if (regProteins.test(proteinsValue)) {
			setFoodProteins(proteinsValue);
		}
	};

	const saveFoodSubmit = () => {
		setErrors(
			createFoodValidation({
				foodName,
				measureUnit: measureUnit,
				foodCalories: !foodCalories
					? foodCalories
					: Number(foodCalories),
				foodCarbohydrates: !foodCarbohydrates
					? foodCarbohydrates
					: Number(foodCarbohydrates),
				foodFats: !foodFats ? foodFats : Number(foodFats),
				foodProteins: !foodProteins
					? foodProteins
					: Number(foodProteins),
			})
		);
		setFormSubmit(true);
	};

	const removeFoodSubmit = () => {
		dispatch(
			startRemoveOwnfood(activeOwnFood?.food_id, navToMealsManagement)
		);
	};

	useEffect(() => {
		if (activeOwnFood) {
			setFoodName(activeOwnFood.food_name);
			setMeasureUnit(activeOwnFood.measure_unit_id);
			setFoodCalories(activeOwnFood.food_calories);
			setFoodFats(activeOwnFood.food_fats);
			setFoodCarbohydrates(activeOwnFood.food_carbohydrates);
			setFoodProteins(activeOwnFood.food_proteins);
		}
	}, [activeOwnFood]);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && formSubmit) {
			const foodInfo = {
				food_name: foodName,
				food_calories: Number(foodCalories),
				food_carbohydrates: !foodCarbohydrates
					? foodCarbohydrates
					: Number(foodCarbohydrates),
				food_fats: !foodFats ? foodFats : Number(foodFats),
				food_measure_unit_id: measureUnit,
				food_proteins: !foodProteins
					? foodProteins
					: Number(foodProteins),
			};

			if (!activeOwnFood) {
				dispatch(startCreateFood(foodInfo, navToMealsManagement));
			} else {
				dispatch(
					startUpdateOwnFood(
						activeOwnFood.food_id,
						foodInfo,
						navToMealsManagement
					)
				);
			}
		}
	}, [errors, formSubmit]);

	return (
		<View style={styles.screen}>
			{messageWarning && (
				<AlertMessage type="warning" message={messageWarning} />
			)}
			<View style={styles.formContainer}>
				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["foodName"]),
							}}
						>
							Nombre Comida*
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.input,
								borderBottomColor: errorColor(
									errors["foodName"]
								),
							}}
							placeholderTextColor={colors.grayPlaceholder}
							onChangeText={(value) => setFoodName(value)}
							value={foodName}
							placeholder="Nombre"
						/>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["measureUnit"]),
							}}
						>
							Unidad*
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<PickerSelect
							placeholder={{
								label: "--Seleccionar--",
								value: null,
							}}
							style={pickerStyle(errors["measureUnit"])}
							value={measureUnit}
							useNativeAndroidPickerStyle={false}
							onValueChange={handleMeasureUnit}
							items={[...measureUnitMap.keys()].map(
								(measureUnitKey) => ({
									label: measureUnitMap.get(measureUnitKey),
									value: measureUnitKey,
								})
							)}
						/>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["foodCalories"]),
							}}
						>
							Calorías (kcal)*
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.input,
								borderBottomColor: errorColor(
									errors["foodCalories"]
								),
							}}
							placeholderTextColor={colors.grayPlaceholder}
							placeholder="0"
							maxLength={5}
							value={foodCalories ? foodCalories.toString() : ""}
							onChangeText={handleCalories}
							keyboardType="numeric"
						/>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["foodFats"]),
							}}
						>
							Grasas (g)
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.input,
								borderBottomColor: errorColor(
									errors["foodFats"]
								),
							}}
							maxLength={5}
							placeholderTextColor={colors.grayPlaceholder}
							placeholder="0"
							value={foodFats ? foodFats.toString() : ""}
							onChangeText={handleFats}
							keyboardType="numeric"
						/>
					</View>
				</View>
				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["footCarbohydrates"]),
							}}
						>
							Carbohidratos (g)
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.input,

								borderBottomColor: errorColor(
									errors["foodCarbohydrates"]
								),
							}}
							maxLength={5}
							placeholderTextColor={colors.grayPlaceholder}
							placeholder="0"
							value={
								foodCarbohydrates
									? foodCarbohydrates.toString()
									: ""
							}
							onChangeText={handleCarbohydrates}
							keyboardType="numeric"
						/>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.labelContainer}>
						<Text
							style={{
								...styles.label,
								color: errorColor(errors["foodProteins"]),
							}}
						>
							Proteínas (g)
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							style={{
								...styles.input,
								borderBottomColor: errorColor(
									errors["foodProteins"]
								),
							}}
							maxLength={5}
							placeholderTextColor={colors.grayPlaceholder}
							placeholder="0"
							value={foodProteins ? foodProteins.toString() : ""}
							onChangeText={handleProteins}
							keyboardType="numeric"
						/>
					</View>
				</View>
			</View>

			{Object.keys(errors).length ? (
				<View>
					<ErrorText>Complete los campos requeridos</ErrorText>
				</View>
			) : null}
			<MainButton
				containerStyle={styles.buttonContainer}
				onPress={saveFoodSubmit}
			>
				Guardar
			</MainButton>

			{activeOwnFood && (
				<MainButton
					containerStyle={styles.buttonContainer}
					buttonStyle={styles.removeButton}
					onPress={removeFoodSubmit}
				>
					Remover
				</MainButton>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "white",
		paddingHorizontal: "8%",
	},
	formContainer: {
		marginTop: 20,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		marginVertical: 10,
	},
	labelContainer: {
		flex: 1,
		paddingRight: 20,
	},
	label: {
		textAlign: "right",
		fontSize: Dimensions.get("window").width > 350 ? 16 : 14,
	},
	inputContainer: {
		flex: 1,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "black",
		paddingVertical: 5,
	},
	placeholder: {
		color: colors.grayPlaceholder,
	},
	buttonContainer: {
		marginVertical: 10,
	},
	removeButton: {
		backgroundColor: "red",
	},
});
