import axios from "axios";
import { url } from "../Url";

const login = (data) => {
    return axios
        .post(`${url}/auth/login`, data)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}

const logoutUser = (data) => {
  return axios
      .post(`${url}/auth/logout`, data)
      .then(async (result) => { 
          return result.data;
  })
  .catch((error) => {
        return error;
  });
}

const verifyInvite = (data) => {
  return axios
    .post(`${url}/auth/verify-invite-token`, data)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};
const registerUser = (data) => {
  return axios
    .post(`${url}/auth/register`, data)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

const verifyUserOtp = (data) => {
  console.log(data.token)
  const config = {
    headers : {authentication : `Bearer ${data.token.access}`}
  }
  console.log(config)
  return axios
    .post(`${url}/auth/verify-otp`, {otp : data.otp}, config)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

const forgotPassword = (data) => {
  return axios
    .post(`${url}/auth/forgot-password`, data)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

const verifyForgotOtp = (data) => {
  console.log(data.token)
  const config = {
    headers : {authentication : `Bearer ${data.token.access}`}
  }
  return axios
    .post(`${url}/auth/verify-forgot-otp`, {otp : data.otp}, config)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

const resetPassword = (data) => {
  const config = {
    headers : {authentication : `Bearer ${data.token}`}
  }
  return axios
    .post(`${url}/auth/reset-password`, {password : data.password}, config)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

const resendOtp = (data) => {
  const config = {
    headers : {authentication : `Bearer ${data.token}`}
  }
  return axios
    .get(`${url}/auth/resend-otp`, config)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      return error;
    });
};

export { verifyInvite, registerUser, login, logoutUser, verifyUserOtp, forgotPassword, verifyForgotOtp, resetPassword, resendOtp };
