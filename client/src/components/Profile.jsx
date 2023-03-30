import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import extend from '../styles/profile.module.css';
import avatar from '../assets/user.png';
import { useFormik } from 'formik';
import { passwordValidate, validateProfile, validateRegister } from '../helper/validate';
import { Toaster } from 'react-hot-toast';
import convertToBase64 from '../helper/convert';

const Profile = () => {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address: '',
    },
    validate: validateProfile,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' });
      console.log(values);
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
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: '45%', height: '100%', paddingTop: '1rem' }}
        >
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
              You can update Details
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='py-4 profile flex justify-center'>
              <label htmlFor='profile'>
                <img
                  src={file || avatar}
                  alt='avatar'
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className='name flex w-3/4 gap-10'>
                <input
                  type='text'
                  placeholder='firstname'
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('firstname')}
                />
                <input
                  type='text'
                  placeholder='lastname'
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('lastname')}
                />
              </div>
              <div className='name flex w-3/4 gap-10'>
                <input
                  type='number'
                  placeholder='Mobile no.'
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('mobile')}
                />
                <input
                  type='email'
                  placeholder='email'
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('email')}
                />
              </div>
              <input
                type='text'
                placeholder='address'
                className={`${styles.textbox} ${extend.textbox}`}
                {...formik.getFieldProps('address')}
              />
              <button
                type='submit'
                className='border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-400'
              >
                Update
              </button>
            </div>
            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Come back later ?
                <Link to='/' className='text-red-600 p-1'>
                  Logout
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
