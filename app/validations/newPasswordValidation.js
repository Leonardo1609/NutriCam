export const newPasswordValidation = ({ newPassword, confirmNewPassword }) => {
	let errors = {};

	if (newPassword.length < 6 || newPassword.length > 15) {
		errors["newPassword"] =
			"El campo nueva contraseña debe tener entre 6 y 15 caracteres";
	}

	if (newPassword !== confirmNewPassword) {
		errors["confirmNewPassword"] = "Las contraseñas no son iguales";
	}

	return errors;
};
