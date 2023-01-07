import axios from "axios";
import { url } from "../Url";

const getUsers = (data) => {
    const config = {
        headers : {authentication : `Bearer ${data.token.access.token}`}
    }
    return axios
        .get(`${url}/users/get-users`, config)
        .then(async (result) => { 
            return result.data;
    })
    .catch((error) => {
          return error;
    });
}


const deleteUser = (data) => {
    console.log('token ', data)
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
export { getUsers, deleteUser };
