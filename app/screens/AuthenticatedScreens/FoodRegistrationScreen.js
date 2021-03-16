import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import PickerSelect from "react-native-picker-select";
import {useSelector} from "react-redux";

export const FoodRegistrationScreen = ({ route }) => {
	const [dayIdToRegist, setDayIdToRegist] = useState(1);

	const { activeFoodToRegist } = useSelector( state => state.food );
	console.log( activeFoodToRegist )

	const dayFoodMap = new Map([
		[1, "Registrar Desayuno"],
		[2, "Registrar Media Mañana"],
		[3, "Registrar Almuerzo"],
		[4, "Registrar Media Tarde"],
		[5, "Registrar Cena"],
	]);

	useEffect(() => {
		if (route.params?.dayIdToRegist) {
			setDayIdToRegist(route.params.dayIdToRegist);
		}
	}, []);

	return (
		<View style={styles.screen}>
			<View>
				<PickerSelect
					value={dayIdToRegist}
					useNativeAndroidPickerStyle={false}
					onValueChange={(value) => setDayIdToRegist(value)}
					items={[...dayFoodMap.keys()].map((dayFoodKey) => ({
						label: dayFoodMap.get(dayFoodKey),
						value: dayFoodKey,
					}))}
				/>
			</View>
			<Text>FoodRegistrationScreen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: '10%'
	},
});
