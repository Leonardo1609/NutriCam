import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { EnterUserDataForm } from "../../../components/EnterUserDataForm";

export const MyDataScreen = () => {
	const { userInformation } = useSelector((state) => state.auth);
	return (
		<EnterUserDataForm>
			{userInformation?.profile && (
				<View>
					<Text>
						Al cambiar tus datos tu índice de masa corporal se
						volverá a calcular y se te asignará un nuevo plan
						nutricional
					</Text>
					<Text>
						IMC Actual:{" "}
						{userInformation.profile.profile_current_imc} kg/m2
					</Text>
					<Text>
						Nivel de peso: {userInformation.profile.w_level_name}
					</Text>
				</View>
			)}
		</EnterUserDataForm>
	);
};

const styles = StyleSheet.create({});
