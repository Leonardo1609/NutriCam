import React, { useState } from "react";
import { AppNavigator } from './navigation/AppNavigator';
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const loadFonts = () => {
	return Font.loadAsync({
		poppins: require("./assets/fonts/Poppins-Regular.ttf"),
		"poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
	});
};

export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={loadFonts}
				onFinish={setFontsLoaded.bind(this, true)}
				onError={console.warn}
			/>
		);
	}

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}
