export const loginValidation = ({ email, password }) => {
	let errors = {};

	if (email.trim() === "") {
		errors["email"] = "El campo correo es obligatorio";
	}

	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!re.test(email.toLowerCase()) && email.trim().length > 0) {
		errors["email"] = "Ingrese un correo válido";
	}

	if (!password) {
		errors["password"] = "El campo contraseña es obligatorio";
	}

	return errors;
};
