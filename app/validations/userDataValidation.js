export const userDataValidation = ( values ) => {
	const { birthdayToShow, height, genre, actualWeight, activityLevel } = values;

	let errors = {};

	if( birthdayToShow.length === 0 ){
		errors['birthdayToShow'] = true;
	}

	if( !height || isNaN(height) || height < 0 ){
		errors['height'] = true;
	}

	if( genre !== 'M' && genre !== 'F' ){
		errors['genre'] = true;
	}

	if( !actualWeight || isNaN(actualWeight) || actualWeight < 0 ){
		errors['actualWeight'] = true;
	}

	if( activityLevel < 0 || activityLevel > 4  || !activityLevel ){
		errors['activityLevel'] = true;
	}

	return errors;
}
