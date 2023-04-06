import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import avatar from '../assets/user.png';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import useFetch from '../hook/fetch.hook';

const Password = () => {
  const {username:{username}} = useAuthStore(state => state.auth);
  const [{isLoading,apiData,serverError}] = useFetch(`user/${username}`);
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    },
  });

  if(isLoading) return <h1 className='text-2xl font-bold'>loading...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  
  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Hello {apiData?.firstname || apiData?.username}!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
              Explore More by connecting with us.
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='py-4 profile flex justify-center'>
              <img src={apiData?.profile || avatar} alt='avatar' className={styles.profile_img} />
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
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
                Sign in
              </button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Forgot your password ?
                <Link to='/reset' className='text-red-600 p-1'>
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
