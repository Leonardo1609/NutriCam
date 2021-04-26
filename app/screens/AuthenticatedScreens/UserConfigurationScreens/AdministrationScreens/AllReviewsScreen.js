import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
	setReviewsPerRating,
	startGetReviewsPerRating,
} from "../../../../actions/administratorActions";
import { MainButton } from "../../../../components/MainButton";
import {
	filterReviews,
	formatDate,
	parserDateToLocale,
} from "../../../../helpers/helpers";
import { useFilterDate } from "../../../../hooks/useFilterDate";
import PickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/es";
import { colors } from "../../../../consts/colors";
moment.locale("es");

export const AllReviewsScreen = ({ route }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { stars } = route.params;

	const { reviewsPerRating, dateFirstReview } = useSelector(
		(state) => state.administrator
	);

	const [filterStars, setFilterStars] = useState(null);

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

	const goBack = () => {
		dispatch(setReviewsPerRating([]));
		navigation.goBack();
	};

	const pickerStyle = () => ({
		inputAndroid: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: "black",
			paddingVertical: 5,
			fontSize: 16,
			fontWeight: "bold",
		},
		inputIOS: {
			color: "black",
			borderBottomWidth: 1,
			borderBottomColor: "black",
			paddingVertical: 5,
			fontSize: 16,
			fontWeight: "bold",
		},
	});

	useEffect(() => {
		setFilterStars(stars);
	}, []);

	useEffect(() => {
		if (filterStars && !initialDate && !lastDate) {
			dispatch(startGetReviewsPerRating(null, null, filterStars));
		}

		if (filterStars && initialDate && !lastDate) {
			dispatch(
				startGetReviewsPerRating(
					initialDate,
					formatDate(new Date()),
					filterStars
				)
			);
		}

		if (filterStars && !initialDate && lastDate) {
			dispatch(
				startGetReviewsPerRating(dateFirstReview, lastDate, filterStars)
			);
		}
		if (filterStars && initialDate && lastDate) {
			dispatch(
				startGetReviewsPerRating(initialDate, lastDate, filterStars)
			);
		}
		if (filterStars === 0 && initialDate && lastDate) {
			dispatch(startGetReviewsPerRating(initialDate, lastDate, null));
		}

		if (filterStars === 0 && !initialDate && !lastDate) {
			dispatch(startGetReviewsPerRating());
		}
	}, [initialDate, lastDate, filterStars]);

	return (
		<View style={styles.screen}>
			<ScrollView>
				<View style={styles.datesContainer}>
					<View style={styles.filterDateContainer}>
						<InitialDatePicker />
					</View>
					<View style={styles.filterDateContainer}>
						<LastDatePicker />
					</View>
				</View>
				<View style={styles.filterStarsContainer}>
					<Text>Filtrar por calificación:</Text>
					<PickerSelect
						style={pickerStyle()}
						value={filterStars}
						placeholder={{}}
						useNativeAndroidPickerStyle={false}
						onValueChange={(value) => setFilterStars(value)}
						items={filterReviews.map((item, idx) => ({
							label: item,
							value: idx,
						}))}
					/>
				</View>
				<View>
					{reviewsPerRating && reviewsPerRating.length > 0 ? (
						<ScrollView style={styles.reviewListContainer}>
							{reviewsPerRating.map((reviewRating) => (
								<View
									key={reviewRating.review_rating_id}
									style={styles.reviewRatingContainer}
								>
									<View
										style={
											styles.userNameAndRatingContainer
										}
									>
										<Text style={styles.userNameText}>
											{reviewRating.user_name}
										</Text>
										<View style={styles.ratingContainer}>
											<Text style={styles.ratingValue}>
												{reviewRating.rating}
											</Text>
											<Ionicons
												name="ios-star"
												size={20}
												color={colors.green}
											/>
										</View>
									</View>
									<View style={styles.userEmailContainer}>
										<Text style={styles.userEmailText}>
											{reviewRating.user_email}
										</Text>
									</View>
									<View style={styles.reviewTextContainer}>
										{reviewRating.review ? (
											<Text style={styles.reviewText}>
												{reviewRating.review}
											</Text>
										) : (
											<Text style={styles.noReview}>
												Sin reseña
											</Text>
										)}
									</View>
									<View style={styles.reviewDateContainer}>
										<Text style={styles.reviewDate}>
											{
												reviewRating.review_rating_updated_date
											}
										</Text>
									</View>
								</View>
							))}
						</ScrollView>
					) : (
						<Text style={styles.notFoundReviews}>
							No se encontraron reseñas
						</Text>
					)}
				</View>
				<MainButton
					containerStyle={styles.goBackButtoncontainer}
					onPress={goBack}
				>
					Volver
				</MainButton>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: "10%",
		paddingTop: 20,
	},
	filterStarsContainer: {
		marginVertical: 20,
	},
	datesContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	filterDateContainer: {
		width: "45%",
	},
	goBackButtoncontainer: {
		marginVertical: 20,
	},
	notFoundReviews: {
		textAlign: "center",
		fontSize: 18,
		fontFamily: "poppins-bold",
	},
	reviewListContainer: {
		height: Dimensions.get("window").height / 2.3,
	},
	reviewRatingContainer: {
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 10,
		marginVertical: 6,
		padding: 5,
	},
	userNameAndRatingContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	userNameText: {
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	ratingValue: {
		fontSize: 16,
		fontWeight: "bold",
		marginRight: 3,
	},
	reviewTextContainer: {
		marginVertical: 8,
	},
	reviewDate: {
		textAlign: "right",
		fontFamily: "poppins-bold",
		color: colors.grayPlaceholder,
	},
	userEmailContainer: {
		borderBottomWidth: 1,
		borderBottomColor: colors.grayPlaceholder,
	},
	userNameText: {
		fontFamily: "poppins",
	},
	reviewText: {
		fontFamily: "poppins",
	},
	noReview: {
		color: colors.grayPlaceholder,
	},
});
