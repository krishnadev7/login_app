import toast from 'react-hot-toast';
import { authenticate } from './helper';

// validate username
export const usernameValidate = async values => {
  const errors = usernameVerify({}, values);
  if(values.username){
    const {status} = await authenticate(values.username);
    if(status !== 200){
      errors.exist = toast.error("User does not exists...!")
    }
  }
  return errors;
};

// validate password
export const passwordValidate = async values => {
  const errors = passwordVerify({}, values);
  return errors;
};

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

// validate register 
export async function validateRegister(values){
  const errors = usernameVerify({}, values)
  passwordVerify({},values)
  emailVerify({}, values)

  return errors;
}

// validate Profile
export async function validateProfile(values){
  const errors = emailVerify({}, values)
  return errors;
}


/* validate username */
const usernameVerify = (error = {}, values) => {
  if (!values.username) {
    error.username = toast.error('Username required');
  } else if (values.username.includes(' ')) {
    error.username = toast.error('Invalid Username!');
  }
  return error;
};

// validate password
const passwordVerify = (error = {}, values) => {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.password) {
    error.password = toast.error('Password required');
  } else if (values.password.includes(' ')) {
    error.password = toast.error('Wrong password..!');
  } else if (values.password.length < 4) {
    error.password = toast.error('password must be greater than 4 characters');
  } else if (!specialChar.test(values.password)) {
    error.password = toast.error('password must have one special character');
  }
  return error;
};

// validate emial
const emailVerify = (error = {}, values) => {
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!values.email) {
    error.password = toast.error('email required');
  } else if (values.email.includes(' ')) {
    error.password = toast.error('wrong email..!');
  }else if (!specialChar.test(values.email)) {
    error.password = toast.error('Invalid email..!');
  }
  return error;
};
