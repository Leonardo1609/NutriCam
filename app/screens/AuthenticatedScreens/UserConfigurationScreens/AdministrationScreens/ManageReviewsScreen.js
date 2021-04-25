import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
	startGetFirstReviewDate,
	startGetQuantityReviewsPerRating,
} from "../../../../actions/administratorActions";
import { formatDate, parserDateToLocale } from "../../../../helpers/helpers";
import { useFilterDate } from "../../../../hooks/useFilterDate";
import { ReviewBars } from "../../../../components/ReviewBars";
import { MainButton } from "../../../../components/MainButton";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../consts/colors";

export const ManageReviewsScreen = () => {
	const navigation = useNavigation();
	const { quantityReviewsPerRating, dateFirstReview } = useSelector(
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
		dispatch(startGetQuantityReviewsPerRating());
	}, []);

	useEffect(() => {
		if (initialDate && !lastDate)
			dispatch(
				startGetQuantityReviewsPerRating(
					initialDate,
					formatDate(new Date())
				)
			);
		if (!initialDate && lastDate)
			dispatch(
				startGetQuantityReviewsPerRating(dateFirstReview, lastDate)
			);
		if (initialDate && lastDate)
			dispatch(startGetQuantityReviewsPerRating(initialDate, lastDate));
		if (!initialDate && !lastDate)
			dispatch(startGetQuantityReviewsPerRating());
	}, [initialDate, lastDate]);

	const navToAllReviews = () => {
		navigation.navigate("AllReviews", { stars: 0 });
	};

	const setAverage = () => {
		const reducer = (acc, curr) => acc + curr.quantity;
		const totalRatings = quantityReviewsPerRating.reduce(reducer, 0);
		let weightRatings = 0;
		quantityReviewsPerRating.forEach((item) => {
			weightRatings += item.rating * item.quantity;
		});

		return weightRatings / totalRatings;
	};

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
			<View style={styles.averageContainer}>
				<Text style={styles.averageText}>
					Promedio: {setAverage()}{" "}
				</Text>
				<Ionicons name="ios-star" color={colors.green} size={36} />
			</View>
			<View style={styles.reviewBarsContainer}>
				<ReviewBars />
			</View>
			<MainButton
				onPress={navToAllReviews}
				containerStyle={styles.buttonContainer}
			>
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
	averageContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		justifyContent: "center",
	},
	averageText: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
