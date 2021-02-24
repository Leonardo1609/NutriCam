import React, { useEffect, useState } from "react";

export const useForm = (initialValues = {}, validation, submitFn) => {
	const [formValues, setFormValues] = useState(initialValues);
	const [errors, setErrors] = useState({});
	const [submit, setSubmit] = useState(false);

	useEffect(() => {
		if( Object.keys( errors ).length === 0 && submit === true  ){
			submitFn();
		}
	}, [ errors, submit ]);

	const reset = ( newFormValues = initialValues ) => {
		setFormValues({
			...newFormValues
		})
	}

	const handleChange = (value, key) => {
		setFormValues((values) => ({
			...values,
			[key]: value,
		}));
	};

	const handleSubmit = () => {
		setErrors(validation(formValues));
		setSubmit(true);
	};

	return {
		formValues,
		errors,
		handleChange,
		handleSubmit,
		reset
	};
};
