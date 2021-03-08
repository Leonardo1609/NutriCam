import React, { useState } from "react";
import { AppNavigator } from './navigation/AppNavigator';
import { Provider } from "react-redux";
import { store } from "./store/store";
import { enableScreens } from "react-native-screens";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

enableScreens();

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
