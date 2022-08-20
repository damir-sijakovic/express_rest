import validator from 'validator';

const postValidator = (bodyObj) => {
    
    if (process.env.SIMPLE_ERROR_MESSAGES === 'true'){    
		return 'Bad request.';
    }
    else {
		if (Object.keys(bodyObj).length === 0) return 'No body data.';
		if (!bodyObj.hasOwnProperty('title')) return "No passed 'title' property.";
		if (!bodyObj.hasOwnProperty('body')) return "No passed 'body' property.";
		if (!validator.isLength(bodyObj.title, { max: 256 })) return "Bad post length. Max '256' charcters.";
		if (!validator.isLength(bodyObj.body, { max: 1024 })) return "Bad post length. Max '1024' charcters.";
	}
    
    return null;
}

export default postValidator;
