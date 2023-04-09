import axios from 'axios';
import jwt_decode from 'jwt-decode'
axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URL;

/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post('/api/authenticate', { username });
  } catch (error) {
    console.log(error);
    return { error: "username doesn't exists..!" };
  }
}

/** to get username from token */
export async function getUsername(){
  const token =  localStorage.getItem('token')
  if(!token) return Promise.reject("Cannot find token..")
  let decode = jwt_decode(token);
  // console.log(decode);
}

/** Get user details */
export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    console.log(error);
    return { error: 'Password didnt match..!' };
  }
}

/** Register User function */
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post('/api/register', credentials);
    let { username, email } = credentials;

    // Sending Email
    if (status == 201) {
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text: msg,
      });
    }

    console.log('msg after register User: ', msg);
    return msg;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

/** Login fucntion */
export async function LoginUser({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      // console.log('Login data', data);
      return { data };
    }
  } catch (error) {
    console.log(error);
    return { error: "Passoword dosen't match..!" };
  }
}

/** Update User function */
export async function UpdateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const { data } = await axios.put('/api/updateuser', response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { data };
  } catch (error) {
    console.log(error);
    return { error: "can't update Profile..!" };
  }
}

/** generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get('/api/generateOTP', { params: { username } });
    //sending otp to mail
    if (status == 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `Your Password Recovery OTP is ${code}. Verify and Recover Your password.`;
      await axios.post('/api/registerMail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP',
      });
    }
    return code;
  } catch (error) {
    return { error };
  }
}

/** verifying OTP */
export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get('/api/verifyOTP', {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

/** resetting password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.get('/api/resetPassword', {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
