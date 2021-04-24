import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	startGetFirstReviewDate,
	startGetReviewsPerRating,
} from "../../../../actions/administratorActions";
import { formatDate, parserDateToLocale } from "../../../../helpers/helpers";
import { useFilterDate } from "../../../../hooks/useFilterDate";
import { Ionicons } from "@expo/vector-icons";
import { ReviewBars } from "../../../../components/ReviewBars";
import { MainButton } from "../../../../components/MainButton";

export const ManageReviewsScreen = () => {
	const { dateFirstReview, quantityReviewsPerRating } = useSelector(
		(state) => state.administrator
	);

	const dispatch = useDispatch();

	const {
		dateToSend: initialDate,
		FilterDatePicker: InitialDatePicker,
	} = useFilterDate(
		"Desde:",
		dateFirstReview && parserDateToLocale(dateFirstReview)
	);
	const {
		dateToSend: lastDate,
		FilterDatePicker: LastDatePicker,
	} = useFilterDate(
		"Hasta:",
		dateFirstReview && parserDateToLocale(dateFirstReview)
	);

	useEffect(() => {
		dispatch(startGetFirstReviewDate());
	}, []);

	useEffect(() => {
		dispatch(startGetReviewsPerRating());
	}, []);

	useEffect(() => {
		if (initialDate && !lastDate)
			dispatch(
				startGetReviewsPerRating(initialDate, formatDate(new Date()))
			);
		if (!initialDate && lastDate)
			dispatch(startGetReviewsPerRating(dateFirstReview, lastDate));
		if (initialDate && lastDate)
			dispatch(startGetReviewsPerRating(initialDate, lastDate));
		if (!initialDate && !lastDate) dispatch(startGetReviewsPerRating());
	}, [initialDate, lastDate]);

	return (
		<View style={styles.screen}>
			<View style={styles.datesContainer}>
				<View style={styles.filterDateContainer}>
					<InitialDatePicker />
				</View>
				<View style={styles.filterDateContainer}>
					<LastDatePicker />
				</View>
			</View>
			<View style={styles.reviewBarsContainer}>
				<ReviewBars />
			</View>
			<MainButton containerStyle={styles.buttonContainer}>
				Ver todas las reseñas
			</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: 20,
		paddingHorizontal: "10%",
	},
	datesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	filterDateContainer: {
		width: "45%",
	},
	reviewBarsContainer: {
		marginVertical: 20,
	},
	buttonContainer: {
		marginVertical: 20,
	},
});
