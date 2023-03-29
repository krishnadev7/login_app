import toast from 'react-hot-toast';

export const usernameValidate = async values => {
  const errors = usernameVerify({}, values);
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
