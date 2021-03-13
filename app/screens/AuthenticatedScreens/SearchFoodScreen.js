import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFoodsFound } from "../../actions/foodActions";
import { foodNotFoundMessage } from "../../consts/consts";
import { MainButton } from "../../components/MainButton";

export const SearchFoodScreen = () => {
	const dispatch = useDispatch();
	const { foodSearchInput, foodsFound } = useSelector((state) => state.food);

	const renderFoods = (food) => {
		const { item, index } = food;
		return (
			<View
				style={index ? styles.foodContainer : styles.firstFoodContainer}
			>
				<Text style={styles.foodName}>{item.food_name}</Text>
			</View>
		);
	};

	useEffect(() => {
		return () => {
			dispatch(setFoodsFound([], ""));
		};
	}, []);

	return (
		<View style={styles.screen}>
			<View style={styles.resultMessageContainer}>
				{!foodSearchInput ? (
					<Text style={styles.resultMessage}>
						Busca alguna comida
					</Text>
				) : (
					<Text style={styles.resultMessage}>
						Resultados para:{" "}
						<Text style={styles.foodSearchedText}>
							{foodSearchInput}
						</Text>
					</Text>
				)}
			</View>
			{foodSearchInput && foodsFound.length ? (
				<>
					<View style={styles.listContainer}>
						<FlatList
							keyExtractor={(item) => item.food_id}
							data={foodsFound}
							renderItem={renderFoods}
						/>
					</View>
					<View style={styles.ifFoodNotFoundContainer}>
						<Text style={styles.ifFoodNotFoundText}>
							{foodNotFoundMessage}
						</Text>
						<MainButton containerStyle={styles.buttonContainer}>
							Crear Comida
						</MainButton>
					</View>
				</>
			) : <View></View>}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
	},
	resultMessageContainer: {
		marginVertical: 20,
	},
	resultMessage: {
		fontSize: 18,
	},
	foodSearchedText: {
		fontWeight: "bold",
	},
	foodContainer: {
		padding: 15,
		borderTopWidth: 1,
		borderTopColor: "black",
	},
	firstFoodContainer: {
		padding: 15,
	},
	foodName: {
		fontSize: 14,
	},
	listContainer: {
		maxHeight: 300,
		borderColor: "black",
		borderWidth: 1,
		elevation: 2,
	},
	ifFoodNotFoundContainer: {
		marginVertical: 20,
	},
	ifFoodNotFoundText: {
		fontSize: 18,
		fontFamily: "poppins",
	},
	buttonContainer: {
		marginVertical: 10,
	},
});
