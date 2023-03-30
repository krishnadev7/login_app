import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import avatar from '../assets/user.png';
import { useFormik } from 'formik';
import {  resetPasswordValidation } from '../helper/validate';
import { Toaster } from 'react-hot-toast';

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_pwd: ''
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    },
  });
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
              Enter new password
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            {/* <div className='py-4 profile flex justify-center'>
              
            </div> */}

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='password'
                placeholder='new password'
                className={styles.textbox}
                {...formik.getFieldProps('password')}
              />
              <input
                type='password'
                placeholder='confirm password'
                className={styles.textbox}
                {...formik.getFieldProps('confirm_pwd')}
              />
              <button
                type='submit'
                className='border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-400'
              >
               Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
