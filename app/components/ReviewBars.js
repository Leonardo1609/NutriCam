import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../consts/colors";
import { useNavigation } from "@react-navigation/native";

export const ReviewBars = () => {
	const navigation = useNavigation();
	const { quantityReviewsPerRating } = useSelector(
		(state) => state.administrator
	);

	const setStars = (quantityStars) => {
		const stars = [];
		for (let i = 1; i <= quantityStars; i++) {
			stars.push(
				<Ionicons
					key={i}
					name="ios-star"
					size={24}
					color={colors.green}
				/>
			);
		}
		return stars;
	};

	const setWidthBar = (quantity) => {
		const reducer = (acc, curr) => acc + curr.quantity;
		const totalRatings = quantityReviewsPerRating.reduce(reducer, 0);
		return totalRatings > 0
			? parseFloat((quantity / totalRatings) * 100).toFixed(1) + "%"
			: 0 + "%";
	};

	const navToAllReviews = (stars) => {
		navigation.navigate("AllReviews", { stars });
	};

	return (
		<View style={styles.barsContainer}>
			{quantityReviewsPerRating.length
				? quantityReviewsPerRating.map((item) => (
						<TouchableOpacity
							onPress={() => navToAllReviews(item.rating)}
							key={item.rating}
							activeOpacity={0.6}
						>
							<View style={styles.row}>
								<View style={styles.quantityBarContainer}>
									<>
										<View
											style={{
												...styles.widthContainer,
												width: setWidthBar(
													item.quantity
												),
											}}
										></View>
										<View
											style={styles.percentageContainer}
										>
											<Text style={styles.quantityText}>
												{item.quantity} -{" "}
												{setWidthBar(item.quantity)}
											</Text>
										</View>
									</>
								</View>
								<View style={styles.starsContainer}>
									{setStars(item.rating).map((item) => item)}
								</View>
							</View>
						</TouchableOpacity>
				  ))
				: null}
		</View>
	);
};

const styles = StyleSheet.create({
	barsContainer: {
		flexDirection: "column-reverse",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 6,
	},
	quantityBarContainer: {
		flex: 1,
		height: 25,
		borderWidth: 2,
		borderColor: "green",
		position: "relative",
	},
	widthContainer: {
		backgroundColor: colors.green,
		height: "100%",
	},
	percentageContainer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
	},
	quantityText: {
		fontSize: 14,
		fontFamily: "poppins-bold",
		textAlign: "center",
	},
	starsContainer: {
		flex: 1,
		flexDirection: "row",
		marginLeft: 10,
	},
});
