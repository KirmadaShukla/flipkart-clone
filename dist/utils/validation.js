"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePincode = exports.validateName = exports.validatePhoneNumber = exports.validatePassword = exports.validateEmail = void 0;
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};
exports.validateEmail = validateEmail;
const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
};
exports.validatePassword = validatePassword;
const validatePhoneNumber = (phoneNumber) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(phoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
const validateName = (name) => {
    const re = /^[a-zA-Z\s\-']+$/;
    return re.test(name);
};
exports.validateName = validateName;
const validatePincode = (pincode) => {
    const re = /^\d{6}$/;
    return re.test(pincode);
};
exports.validatePincode = validatePincode;
//# sourceMappingURL=validation.js.map