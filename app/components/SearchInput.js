import React, { useEffect } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../consts/colors";
import { debounce } from "lodash";
import { setFoodsFound, startSearchFood } from "../actions/foodActions";

export const SearchInput = () => {
	const dispatch = useDispatch();

	const handleChange = debounce((value) => {
		if (value) {
			dispatch(startSearchFood(value));
		} else {
			dispatch(setFoodsFound([], value));
		}
	}, 1000);

	useEffect(() => {
		return () => {
			handleChange.cancel();
		};
	}, []);

	return (
		<View>
			<TextInput
				placeholder="Buscar Comida..."
				placeholderTextColor="#f5f5f5"
				autoFocus={true}
				style={styles.input}
				onChangeText={handleChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
