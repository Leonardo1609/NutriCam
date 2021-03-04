export const loginValidation = ({ email, password }) => {
	let errors = {};

	if (email.trim() === "") {
		errors["email"] = "El campo email es obligatorio";
	}

	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!re.test(email.toLowerCase()) && email.trim().length > 0) {
		errors["email"] = "Ingrese un correo válido";
	}

	if (password.trim().length < 6 || password.trim().length > 15) {
		errors["password"] = "El campo contraseña es obligatorio";
	}

	return errors;
};
