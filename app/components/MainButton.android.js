import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from '../consts/colors';

export const MainButton = ({ containerStyle, buttonStyle, onPress, ...rest }) => {
  let ButtonComponent = TouchableOpacity;

  if ( Platform.Version >= 21 ) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={{...styles.buttonContainer, ...containerStyle }}>
      <ButtonComponent activeOpacity={ 0.8 } onPress={ onPress }>
          <View style={{ ...styles.button, ...buttonStyle }}>
            <Text style={ styles.buttonText }>{ rest.children }</Text>
          </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        elevation: 3
    },
    button: {
        paddingVertical: 10,
        backgroundColor: colors.green,
		borderRadius: 5
    },
    buttonText: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 10,
		fontFamily: 'poppins-bold'
    }
});
