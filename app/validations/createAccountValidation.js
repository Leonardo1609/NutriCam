export const createAccountValidation = ({
	username,
	email,
	password,
	confirmPassword,
}) => {
	let errors = {};

	if (username.trim().length < 6 || username.trim().length > 15) {
		errors["username"] =
			"El campo nombre de usuario debe tener entre 6 y 15 caracteres";
	}

	if (email.trim() === "") {
		errors["email"] = "El campo correo es obligatorio";
	}

	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (!re.test(email.toLowerCase()) && email.trim().length > 0) {
		errors["email"] = "Ingrese un correo válido";
	}

	if (password.trim().length < 6 || password.trim().length > 15) {
		errors["password"] = "El campo contraseña debe tener entre 6 y 15 caracteres";
	}

	if (password !== confirmPassword) {
		errors["confirmPassword"] = "Las contraseñas no son iguales";
	}

	return errors;
};
