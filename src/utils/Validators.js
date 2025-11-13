export const validators = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return null;
    },

    password: (password) => {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return null;
    },

    phone: (phone) => {
        const phoneRegex = /^\+?[\d\s-()]+$/;
        if (!phone) return 'Phone number is required';
        if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
        if (phone.replace(/\D/g, '').length < 10) return 'Phone number is too short';
        return null;
    },

    required: (value, fieldName = 'This field') => {
        if (!value || value.toString().trim() === '') {
            return `${fieldName} is required`;
        }
        return null;
    },

    minLength: (value, min, fieldName = 'Value') => {
        if (value && value.length < min) {
            return `${fieldName} must be at least ${min} characters`;
        }
        return null;
    },

    number: (value, fieldName = 'Value') => {
        if (value && isNaN(Number(value))) {
            return `${fieldName} must be a number`;
        }
        return null;
    },
};

export const validateForm = (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
        const value = formData[field];
        const fieldRules = rules[field];

        for (const rule of fieldRules) {
            const error = rule(value);
            if (error) {
                errors[field] = error;
                break;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};