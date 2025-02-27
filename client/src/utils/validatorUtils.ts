import { log } from "./logUtils";

const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  log('Email Validator', emailRegex.test(email))
  
  return emailRegex.test(email) ? '' : 'Invalid email format';
};

const validateTextLength = (
  text: string,
  minLength: number,
  maxLength: number,
): string => {
  if (text.length < minLength)
    return `Minimum length is ${minLength} characters`;
  if (text.length > maxLength)
    return `Maximum length is ${maxLength} characters`;
  return '';
};

const validateNumber = (value: string, min: number, max: number): string => {
  const num = parseInt(value, 10);
  if (isNaN(num)) return 'Must be a number';
  if (num < min) return `Minimum value is ${min}`;
  if (num > max) return `Maximum value is ${max}`;
  return '';
};

const validatePassword = (
  password: string,
  minLength = 8,
  requireSpecialChar = true,
  requireUppercase = true,
  requireLowercase = true,
  requireNumber = true,
): string => {
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters long.`;
  }
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (requireLowercase && !/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (requireNumber && !/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*...).';
  }
  return '';
};

const validateRepassword = (
    rePassword: string,
    password: string,
): string => {
    if (rePassword !== password) {
        return "Password doesn't match"
    }

    return ''
}

export {validateTextLength, validateNumber, validateEmail, validatePassword, validateRepassword};
