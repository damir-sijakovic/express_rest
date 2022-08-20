import validator from 'validator';

const registerValidator = (bodyObj) => {
    
    if (process.env.SIMPLE_ERROR_MESSAGES === 'true'){    
		return 'Bad request.';
    }
    else {
		if (Object.keys(bodyObj).length === 0) return 'No body data.';
		if (!bodyObj.hasOwnProperty('email')) return "No passed 'email' property.";
		if (!bodyObj.hasOwnProperty('password')) return "No passed 'password' property.";		 
		if (!validator.isEmail(bodyObj.email)) return 'Bad email format.';
		if (!validator.isLength(bodyObj.password, { min: 8 })) return 'Bad password length.';
	}
    
    return null;
}

export default registerValidator;
