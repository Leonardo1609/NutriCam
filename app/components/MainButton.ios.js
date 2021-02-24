import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export const MainButton = props => {
  return (
    <TouchableOpacity style={ styles.button } onPress={ props.onPress }>
        <Text style={ styles.buttonText }>{ props.children }</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: '80%',
        paddingVertical: 10
    },
    buttonText: {
		fontSize: 18,
		fontFamily: 'poppins-bold'
    }
});
