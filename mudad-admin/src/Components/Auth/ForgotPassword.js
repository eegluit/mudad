import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../assets/scss/style.scss';
import './Login.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import {forgotPassword} from '../../services/auth';
import { addToken, logout } from '../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';

const initialValues = {
    email: ""
};

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const forgotSchema = Yup.object({
        email: Yup.string()
          .email('Please enter a valid email')
          .required("Please enter email.")
      });
      const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: forgotSchema,
        onSubmit: (values) => {
          setLoading(true);
          console.log(values)
          forgotPassword(values)
            .then(async (response) => {
              console.log(response)
              if(response.token) {
                dispatch(addToken(response.token));
                navigate("/verify-otp", {state: 'forgot'});
              } else if(response.response.data.code == 404) {
                errors.email = 'Please enter correct email';
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
                                    <h3 className="mb-4">Forgot Password</h3>
                                    <div className="form-group mb-4">
                                        <input 
                                            type="email"
                                            name="email" 
                                            className="form-control" 
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                            placeholder="Email"
                                        />
                                        {errors.email && touched.email ? (
                                            <span style={{ color: "red" }}>{errors.email}</span>
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
