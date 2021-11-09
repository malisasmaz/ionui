export const handleValidation = (req) => {
    let errors = {};
    let formIsValid = true;

    if (!req.userName) {
        formIsValid = false;
        errors["UserName"] = "Cannot be empty";
    }
    else if (typeof req.userName !== "undefined") {
        if (!req.userName.match(/^[^\\\/,.^]+$/)) {
            formIsValid = false;
            errors["UserName"] = "Can not contain these characters: \\/,.^";
        }
    }

    if (!req.password) {
        formIsValid = false;
        errors["Password"] = "Cannot be empty";
    }
    else if (typeof req.password !== "undefined") {
        if (!req.password.match(/^[a-zA-Z]+$/)) {
            formIsValid = false;
            errors["Password"] = "Can not contain these characters: \\/,.^";
        }
    }

    if (!formIsValid) {
        console.error({ errors: errors });
        alert(getErrorMessages(errors));
    }
    return formIsValid;
};

const getErrorMessages = (errors) => {
    var text = "";
    for (const item in errors) {
        text += item + " : " + errors[item] + "\r\n";
    }
    return text;
}

