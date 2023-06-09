import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Username.module.css';
import avatar from '../assets/user.png';
import { useFormik } from 'formik';
import { passwordValidate, usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import { Toaster, toast } from 'react-hot-toast';
import { generateOTP, verifyOTP } from '../helper/helper';

const Recovery = () => {
  const navigate = useNavigate();
  const {
    username: { username },
  } = useAuthStore(state => state.auth);
  const [otp, setOtp] = useState();
  useState(() => {
    generateOTP(username).then(otp => {
      console.log(otp);
      if (otp) return toast.success('OTP has send to your email!');
      return toast.error('Problem while generating otp!');
    });
  }, [username]);

  const onSubmit = async e => {
    e.preventDefault();
      let { status } = await verifyOTP({ username, code: otp });
      if (status == 201) {
       toast.success('verify successfully..!');
        return navigate('/reset');
      }else{
        return toast.error("wrong otp check your email again!!")
      }

  };

  const resendOtp = e => {
    e.preventDefault();
    let resendPromise = generateOTP(username);
    toast.promise(resendPromise, {
      loading: 'sending..',
      success: <b>otp has been send to your email</b>,
      error: <b>Cant send otp</b>,
    });
    resendPromise.then(otp => {
      console.log(otp);
    });
  };

  return (
    <div className='container mx-auto'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='flex justify-center items-center h-screen'>
        <div className='styles.glass'>
          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
              Enter OTP to recover password
            </span>
          </div>
          <form className='py-1' onSubmit={onSubmit}>
            <div className='py-4 profile flex justify-center'>
              <span className='text-sm text-gray-600 py-4'>
                Enter 6 digit otp sent to your email address
              </span>
            </div>

            <div className='textbox flex flex-col items-center gap-6'>
              <input
                type='number'
                placeholder='O T P'
                onChange={e => setOtp(e.target.value)}
                className={styles.textbox}
              />
              <button
                type='submit'
                className='border bg-indigo-500 w-3/4 py-4 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-red-400'
              >
                Recover
              </button>
            </div>
          </form>
            <div className='text-center py-4'>
              <span className='text-gray-500'>
                Can't get OTP ?
                <button className='text-red-600 p-1' onClick={resendOtp}>Resend Otp</button>
              </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
