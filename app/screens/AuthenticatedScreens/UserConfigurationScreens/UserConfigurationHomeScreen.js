import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

export const UserConfigurationMainScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { userInformation } = useSelector((state) => state.auth);

	const routes = [
		{
			name: "Mis datos",
			component: "MyData",
		},
		{
			name: "Ajustes Generales",
			component: "GeneralConfiguration",
		},
		{
			name: "Reseñar / Calificar aplicación",
			component: "ReviewRating",
		},
		{
			name: "Administrar Comidas",
			component: "MealManagement",
		},
		{
			name: "Administrar Horario",
			component: "ScheduleManagement",
		},
		{
			name: "Alimento de Equivalencia",
			component: "Equivalence",
		},
	];

	const navigateFn = (component) => {
		navigation.navigate(component);
	};

	const logout = () => {
		dispatch(logoutUser());
	};

	return (
		<View style={styles.screen}>
			{routes.map(({ name, component }) => (
				<TouchableOpacity
					activeOpacity={0.5}
					key={name}
					onPress={() => navigateFn(component)}
				>
					<View style={styles.routeContainer}>
						<Text style={styles.routeText}>{name}</Text>
					</View>
				</TouchableOpacity>
			))}
			{userInformation?.user?.user_role === 1 && (
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						navigateFn("AdministrationPanel");
					}}
				>
					<View style={styles.routeContainer}>
						<Text style={styles.routeText}>
							Panel de Administrador
						</Text>
					</View>
				</TouchableOpacity>
			)}

			<TouchableOpacity activeOpacity={0.5} onPress={logout}>
				<View style={styles.logoutContainer}>
					<Text style={styles.routeText}>Cerrar sesión</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: "white",
		flex: 1,
	},
	routeContainer: {
		padding: 10,
		backgroundColor: "#f3f3f3",
		borderBottomWidth: 1,
		borderBottomColor: "black",
	},
	routeText: {
		fontSize: 16,
		fontFamily: "poppins-bold",
	},
	logoutContainer: {
		padding: 10,
		backgroundColor: "red",
		borderBottomWidth: 1,
		borderBottomColor: "black",
	},
});
