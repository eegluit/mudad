import axios from "axios";
import { url } from "../Url";

const getUsers = (data) => {
    const config = {
        headers : {authentication : `Bearer ${data.token.access.token}`}
    }
    return axios
        .post(`${url}/users/get-users`, {role : data.role},config)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}


const deleteUser = (data) => {
    const config = {
        headers : {authentication : `Bearer ${data.token.access.token}`}
    }
    return axios
        .post(`${url}/users/delete-user`, {userId : data.id}, config)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}

const userKycDetalis = (data) => {
    console.log('token ', data)
    const config = {
        headers : {authentication : `Bearer ${data.token.access.token}`}
    }
    return axios
        .post(`${url}/kyc/get-kyc-details`, {userId : data.userId}, config)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}

const kycVerified = (data) => {
    console.log('token ', data)
    const config = {
        headers : {authentication : `Bearer ${data.token.access.token}`}
    }
    return axios
        .post(`${url}/kyc/update-kyc-details`, {id : data.id, status : data.status}, config)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}

export { getUsers, deleteUser, userKycDetalis, kycVerified };
