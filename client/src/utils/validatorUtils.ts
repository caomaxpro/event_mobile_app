import {log} from './logUtils';

export type ValidationResult = {
  message: string;
  isValid: boolean;
};

const validateEmail = (email: any): ValidationResult[] => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return [
    {
      message: 'Must be a valid email address',
      isValid: isValid,
    },
  ];
};

const validateTextLength = (
  text: any,
  minLength: number = 0,
  maxLength: number = Infinity,
): ValidationResult[] => {
  const textInput = String(text);

  return [
    {
      message: `Minimum length is ${minLength} characters`,
      isValid: textInput.length >= minLength,
    },
    {
      message: `Maximum length is ${maxLength} characters`,
      isValid: textInput.length <= maxLength,
    },
  ];
};

const validateNumber = (
  value: any,
  min: number = -Infinity,
  max: number = Infinity,
): ValidationResult[] => {
  const num = parseInt(value, 10);
  return [
    {
      message: 'Must be a valid number',
      isValid: !isNaN(num),
    },
    {
      message: `Must be at least ${min}`,
      isValid: !isNaN(num) && num >= min,
    },
    {
      message: `Must not exceed ${max}`,
      isValid: !isNaN(num) && num <= max,
    },
  ];
};

const validatePassword = (
  password: any,
  minLength = 8,
  requireSpecialChar = true,
  requireUppercase = true,
  requireLowercase = true,
  requireNumber = true,
): ValidationResult[] => {
  password = String(password);

  return [
    {
      message: `Must be at least ${minLength} characters long`,
      isValid: password.length >= minLength,
    },
    {
      message: 'Must contain at least one uppercase letter',
      isValid: !requireUppercase || /[A-Z]/.test(password),
    },
    {
      message: 'Must contain at least one lowercase letter',
      isValid: !requireLowercase || /[a-z]/.test(password),
    },
    {
      message: 'Must contain at least one number',
      isValid: !requireNumber || /[0-9]/.test(password),
    },
    {
      message: 'Must contain at least one special character (!@#$%^&*...)',
      isValid: !requireSpecialChar || /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];
};

const validateRepassword = (
  rePassword: any,
  password: any,
): ValidationResult[] => {
  rePassword = String(rePassword);
  password = String(password);

  return [
    {
      message: 'Passwords must match',
      isValid: rePassword === password,
    },
  ];
};

const validateDate = (date: Date): ValidationResult[] => {
  return [
    {
      message: 'Date must be in the future',
      isValid: date > new Date(),
    },
  ];
};

const validateEndDate = (
  startDate: Date,
  endDate: Date,
): ValidationResult[] => {
  return [
    {
      message: 'End date must be after start date',
      isValid: endDate > startDate,
    },
  ];
};

const MAX_IMAGE_SIZE_MB = 5;
const BYTES_PER_MB = 1024 * 1024;

type MediaValidationOptions = {
  maxSizeMB?: number;
  allowedTypes?: string[];
};

const validateMedia = async (
  file: File | string,
  options: MediaValidationOptions = {},
): Promise<ValidationResult[]> => {
  const {
    maxSizeMB = MAX_IMAGE_SIZE_MB,
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  } = options;

  const results: ValidationResult[] = [
    {
      message: 'Must be a valid image file',
      isValid:
        file instanceof File ||
        (typeof file === 'string' &&
          (file.startsWith('http://') || file.startsWith('https://'))),
    },
    {
      message: `File size must not exceed ${maxSizeMB}MB`,
      isValid: true, // Will be updated after size check
    },
  ];

  if (file instanceof File) {
    results.push({
      message: `File type must be one of: ${allowedTypes.join(', ')}`,
      isValid: allowedTypes.includes(file.type),
    });

    results[1].isValid = file.size <= maxSizeMB * BYTES_PER_MB;
  } else if (
    typeof file === 'string' &&
    (file.startsWith('http://') || file.startsWith('https://'))
  ) {
    try {
      const response = await fetch(file, {method: 'HEAD'});
      const size = parseInt(response.headers.get('content-length') || '0');
      results[1].isValid = size <= maxSizeMB * BYTES_PER_MB;
    } catch (error) {
      results[0].isValid = false;
    }
  }

  return results;
};

const validateMediaRN = async (
  uri: string,
  options: MediaValidationOptions = {},
): Promise<ValidationResult[]> => {
  const {maxSizeMB = MAX_IMAGE_SIZE_MB} = options;

  const results: ValidationResult[] = [
    {
      message: 'Must be a valid image URI',
      isValid:
        uri.startsWith('file://') ||
        uri.startsWith('http://') ||
        uri.startsWith('https://'),
    },
    {
      message: `Image size must not exceed ${maxSizeMB}MB`,
      isValid: true, // Will be updated after size check
    },
  ];

  try {
    if (uri.startsWith('file://')) {
      const response = await fetch(uri);
      const blob = await response.blob();
      results[1].isValid = blob.size <= maxSizeMB * BYTES_PER_MB;
    } else if (uri.startsWith('http://') || uri.startsWith('https://')) {
      const response = await fetch(uri, {method: 'HEAD'});
      const size = parseInt(response.headers.get('content-length') || '0');
      results[1].isValid = size <= maxSizeMB * BYTES_PER_MB;
    } else {
      results[0].isValid = false;
    }
  } catch (error) {
    results[0].isValid = false;
  }

  return results;
};

export {
  validateTextLength,
  validateNumber,
  validateEmail,
  validatePassword,
  validateRepassword,
  validateDate,
  validateEndDate,
  validateMedia,
  validateMediaRN,
};
