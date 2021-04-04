import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { colors } from "../../../consts/colors";
import { MainButton } from "../../../components/MainButton";
import {
	setMessageWarning,
	setMessageSuccess,
} from "../../../actions/uiActions";
import { useDispatch, useSelector } from "react-redux";
import {
	startDeleteReviewRating,
	startGetReviewRating,
	startModifyReviewRating,
	startPostReviewRating,
} from "../../../actions/reviewRatingActions";
import { AlertMessage } from "../../../components/AlertMessage";

const getRatingColor = (rating) => {
	switch (rating) {
		case 1:
			return "red";
		case 2:
			return "#FF4500";
		case 3:
			return "orange";
		case 4:
			return "#FAEE1C";
		case 5:
			return colors.green;
	}
};

export const ReviewRatingScreen = () => {
	const dispatch = useDispatch();

	const { reviewRating } = useSelector((state) => state.reviewRating);
	const { messageWarning, messageSuccess } = useSelector((state) => state.ui);

	const [rating, setRating] = useState(0);
	const [review, setReview] = useState("");

	const handleRating = (value) => {
		setRating(value);
	};

	const handleReview = (value) => {
		if (value.length <= 300) {
			setReview(value);
		}
	};

	const submitReviewRating = () => {
		if (!rating) {
			dispatch(setMessageWarning("La puntuación es requerida"));
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			return;
		}

		if (review.length > 300) {
			dispatch(
				setMessageWarning(
					"La reseña no puede tener más de 300 caracteres"
				)
			);
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			return;
		}

		if (!reviewRating) {
			dispatch(startPostReviewRating(rating, review));
		} else {
			dispatch(
				startModifyReviewRating(
					reviewRating.review_rating_id,
					rating,
					review
				)
			);
		}
	};

	const submitDeleteReviewRating = () => {
		dispatch(startDeleteReviewRating());
	};

	useEffect(() => {
		dispatch(startGetReviewRating());
	}, []);

	useEffect(() => {
		if (reviewRating) {
			setRating(reviewRating.rating);
			setReview(reviewRating.review);
		} else {
			setRating(0);
			setReview("");
		}
	}, [reviewRating]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<View style={styles.screen}>
				{messageSuccess && (
					<AlertMessage type="success" message={messageSuccess} />
				)}
				{messageWarning && (
					<AlertMessage type="warning" message={messageWarning} />
					
				)}
				{!reviewRating && (
					<View>
						<Text style={styles.greetsUser}>Hola Leonardo </Text>
						<Text style={styles.giveUsReviewText}>
							Déjanos tu comentario sobre la aplicación
						</Text>
					</View>
				)}
				<View style={styles.ratingContainer}>
					<AirbnbRating
						type="custom"
						reviewColor={getRatingColor(rating)}
						reviews={[
							"Terrible",
							"Malo",
							"Bueno",
							"Muy Bueno",
							"Excelente",
						]}
						showRating={rating ? true : false}
						defaultRating={rating}
						imageSize={50}
						selectedColor={getRatingColor(rating)}
						onFinishRating={handleRating}
					/>
				</View>
				<View style={styles.reviewContainer}>
					<Text style={styles.subtitle}>Escribe tu reseña</Text>
					<TextInput
						style={styles.inputReviewContainer}
						placeholder="Escribe tu reseña aquí..."
						multiline={true}
						numberOfLines={5}
						value={review}
						onChangeText={handleReview}
					/>
				</View>
				<MainButton
					containerStyle={styles.buttonContainer}
					onPress={submitReviewRating}
				>
					Enviar
				</MainButton>
				{reviewRating && (
					<MainButton
						buttonStyle={styles.removeReviewRating}
						onPress={submitDeleteReviewRating}
						containerStyle={styles.buttonContainer}
					>
						Eliminar
					</MainButton>
				)}
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
	greetsUser: {
		marginTop: 20,
		fontSize: 24,
		fontFamily: "poppins-bold",
		textAlign: "center",
		color: colors.green,
	},
	giveUsReviewText: {
		fontSize: 18,
		fontFamily: "poppins",
		textAlign: "center",
	},
	ratingContainer: {
		marginVertical: 20,
	},
	reviewContainer: {
		marginVertical: 10,
	},
	subtitle: {
		fontFamily: "poppins",
		fontSize: 18,
		marginBottom: 10,
	},
	inputReviewContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		textAlignVertical: "top",
		padding: 10,
		fontSize: 16,
	},
	buttonContainer: {
		marginVertical: 10,
	},
	removeReviewRating: {
		backgroundColor: "red",
	},
});
