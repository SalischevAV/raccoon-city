import validate from 'validate.js';
import {LoginFormInterface} from '../../components/Authentication/Login/Login';

export function getError(meta: any) {
    if (meta.error && meta.touched) {
        return meta.error;
    }

    return undefined;
}
const constraints = {
    email: {
        email: true
    }
};

export const isRequired = (value: any) => (value ? undefined : 'Обязательное поле');
export const isNumber = (value: any) => {
    return validate.isNumber(+value) ? undefined : 'Это числовое поле';
};
export const isInteger = (value: any) => {
    return validate.isInteger(+value) ? undefined : 'Это целое число';
};
export const isRequiredAndIsNumber = (value: any) => {
    return isRequired(value) || isNumber(value);
};
export const isRequiredAndIsInteger = (value: any) => {
    return isRequired(value) || isInteger(value);
};
export const validateEmail = (email: string) => {
    return !isRequired(email) || !validate({email}, constraints);
};
export const validatePassword = (password: string) => {
    const regex = /(?=.*\d)(?=.*[a-z]).{6,}/;
    return regex.test(password);
};
export const validateLoginForm = (form: LoginFormInterface) => {
    const errors: any = {};
    if (!validateEmail(form.email)) {
        errors.email = 'Invalid email!';
    }
    if (!validatePassword(form.password)) {
        errors.password = Number(form.password) < 6 ? 'Must contain at least 6 characters' : 'Must contain number';
    }
    return errors;
};
