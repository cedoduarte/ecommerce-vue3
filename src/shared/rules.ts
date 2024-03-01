export const passwordRules = [
    (v: any) => !!v || 'Password is required',
    (v: any) => (v && v.length >= 8) || "The password needs to have a minimum length of 8, an upper case letter, a lower case letter, a digit, a special character!"
];

export const usernameRules = [
    (v: any) => !!v || 'Username is required',
    (v: any) => (v && v.length >= 3) || "Username needs to have at least 3 characters"
];

export const requiredFieldRules = [
    (v: any) => !!v || "Required field"
];