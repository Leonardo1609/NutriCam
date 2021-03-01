import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { MainButton } from "../components/MainButton";

export const FirstScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={{
            uri:
              "https://cdn.andro4all.com/files/2019/09/apps-reconocimiento-comidas.jpg",
          }}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <MainButton style={styles.buttonSeparation}>Iniciar Sesión</MainButton>
        <MainButton
          style={styles.buttonSeparation}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          Crear Cuenta
        </MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
	paddingHorizontal: '10%'
  },
  buttonSeparation: {
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
