export const changeEmailValidation = ({ currentEmail, newEmail, password }) => {
	let errors = {};

	if (currentEmail.trim() === "") {
		errors["currentEmail"] = "El campo correo actual es obligatorio";
	}

	if (newEmail.trim() === "") {
		errors["newEmail"] = "El campo nuevo correo es obligatorio";
	}

	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (
		!re.test(currentEmail.toLowerCase()) &&
		currentEmail.trim().length > 0
	) {
		errors["currentEmail"] = "Ingrese un correo válido";
	}

	if (!re.test(newEmail.toLowerCase()) && newEmail.trim().length > 0) {
		errors["newEmail"] = "Ingrese un correo válido";
	}

	if (!password) {
		errors["password"] = "El campo contraseña es obligatorio";
	}

	return errors;
};
