import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import '../../assets/scss/style.scss';
import './Login.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import {resetPassword} from '../../services/auth';
import { addToken, logout } from '../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

const initialValues = {
    password: ""
};

export const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();

    const resetSchema = Yup.object({
        password: Yup.string().min(8, 'Password should be of 8 character.')
          .required("Please enter password.")
      });
      const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: resetSchema,
        onSubmit: (values) => {
          setLoading(true);
          console.log(values)
          let data = {
            token : location.state,
            password : values.password
          }
          resetPassword(data)
            .then(async (response) => {
                console.log('called')
              if(response.message) {
                navigate("/");  
              } 
                setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              // alert(error.response.data.message);
            });
        },
      });
  return (
    <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <form onSubmit={handleSubmit} novalidate >
                                    <h3 className="mb-4">Reset Password</h3>
                                    <div className="form-group mb-4">
                                        <input 
                                            type="password"
                                            name="password" 
                                            className="form-control" 
                                            onChange={handleChange}
                                            value={values.password}
                                            onBlur={handleBlur}
                                            placeholder="Password"
                                        />
                                        {errors.password && touched.password ? (
                                            <span style={{ color: "red" }}>{errors.password}</span>
                                        ) : null}
                                    </div>
                                    {
                                        isLoading ? <div className="btn btn-primary shadow-2 mb-4">
                                        <div class="spinner-border spinner-border-sm text-light" role="status"></div>
                                      </div> :
                                    <button type='submit' className="btn btn-primary shadow-2 mb-4">Submit</button>
                                    }
                                    <Link className='cancel_btn' to="/"><button className="btn btn-primary shadow-2 mb-4">Cancel</button></Link>
                                </form>
                              </div>
                        </div>
                    </div>
                </div>
  )
}
