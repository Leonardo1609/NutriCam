export const changePasswordValidation = ({ currentPassword, newPassword, confirmNewPassword }) => {
	let errors = {};

	if (!currentPassword) {
		errors["currentPassword"] = "El campo contraseña actual es obligatorio";
	}

	if (newPassword.trim().length < 6 || newPassword.trim().length > 15) {
		errors["newPassword"] = "El campo nueva contraseña debe tener entre 6 y 15 caracteres";
	}

	if (newPassword !== confirmNewPassword) {
		errors["confirmNewPassword"] = "Las contraseñas no son iguales";
	}

	return errors;
};
