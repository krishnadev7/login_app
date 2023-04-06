import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import avatar from '../assets/user.png';
import { useFormik } from 'formik';
import { passwordValidate, validateRegister } from '../helper/validate';
import { Toaster, toast } from 'react-hot-toast';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: validateRegister,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise,{
        loading: 'creating..',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not register</b>
      })
      registerPromise.then(function(){navigate('/')})
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div
          className={styles.glass}
          style={{ width: '45%', height: '100%', paddingTop: '1rem' }}
        >
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
              Happy to join you.
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='py-4 profile flex justify-center'>
              <label htmlFor='profile'>
                <img
                  src={file || avatar}
                  alt='avatar'
                  className={styles.profile_img}
                />
              </label>
              <input
                type='file'
                id='profile'
                name='profile'
                onChange={onUpload}
              />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='email'
                placeholder='email'
                className={styles.textbox}
                {...formik.getFieldProps('email')}
              />
              <input
                type='text'
                placeholder='username'
                className={styles.textbox}
                {...formik.getFieldProps('username')}
              />
              <input
                type='password'
                placeholder='Password'
                className={styles.textbox}
                {...formik.getFieldProps('password')}
              />
              <button
                type='submit'
                className='border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-400'
              >
                Register
              </button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Already Registered ?
                <Link to='/' className='text-red-600 p-1'>
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
