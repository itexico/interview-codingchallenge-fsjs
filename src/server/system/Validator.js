const Regex = {
    Integer: /^\d*$/,
    Double: /^\d*(\.\d+)?$/,
    Phone: /^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/,
    Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    MongoID: /^[\da-f]{24}$/i,
    CP: /^\d{5}$/
};

const DataValidator = function(validations) {
    return new Promise((resolve, reject) => {
        const validatedData = { };
        const invalidData = { };

        validations.forEach(element => {
            if (!ValidatorMethods[element.validator]) {
                console.error(`Validator ${element.validator} does not exist`);
            }
            if ((element.value === null || element.value === undefined) && element.required) {
                invalidData[element.fieldName] = element.value;
            }
            else if (ValidatorMethods[element.validator](element.value)) {
                validatedData[element.fieldName] = element.value;
            } else {
                invalidData[element.fieldName] = element.value;
            }
        });

        if (Object.keys(invalidData).length === 0) {
            resolve(validatedData);
        } else {
            reject(invalidData);
        }
    });
};

const ValidatorMethods = new Object();

ValidatorMethods.String = function(data) {
    try {
        new String(data);
        return true;
    } catch(e) {
        return false;
    }
};

ValidatorMethods.Integer = function(data) {
    try {
        return (new String(data)).match(Regex.Integer);
    } catch(e) {
        return false;
    }
};

ValidatorMethods.Double = function(data) {
    try {
        return (new String(data)).match(Regex.Double);
    } catch(e) {
        return false;
    }
};

ValidatorMethods.Phone = function(data) {
    try {
        return (new String(data)).match(Regex.Phone);
    } catch(e) {
        return false;
    }
};

ValidatorMethods.Email = function(data) {
    try {
        return (new String(data)).match(Regex.Email);
    } catch(e) {
        return false;
    }
};

ValidatorMethods.MongoID = function(data) {
    try {
        return (new String(data)).match(Regex.MongoID);
    } catch(e) {
        return false;
    }
};

module.exports.validate = DataValidator;
module.exports.Regex = Regex;