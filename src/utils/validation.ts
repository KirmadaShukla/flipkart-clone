// Email validation
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Password validation
export const validatePassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Phone number validation (India format)
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const re = /^[6-9]\d{9}$/;
  return re.test(phoneNumber);
};

// Name validation
export const validateName = (name: string): boolean => {
  // Allow letters, spaces, hyphens, and apostrophes
  const re = /^[a-zA-Z\s\-']+$/;
  return re.test(name);
};

// Pincode validation (India format)
export const validatePincode = (pincode: string): boolean => {
  const re = /^\d{6}$/;
  return re.test(pincode);
};