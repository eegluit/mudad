import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../assets/scss/style.scss';
import './Login.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import {login} from '../../services/auth';
import { addToken, logout, loginData } from '../../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
const initialValues = {
    email: "",
    password: "",
};

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      dispatch(logout());
    }, []);

    const loginSchema = Yup.object({
        email: Yup.string()
          .email("Please enter a valid email.")
          .required("Please enter email."),
        password: Yup.string().required("Please enter password."),
      });
      const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
          setLoading(true);
          console.log(values)
          values.role = 'admin';
          login(values)
            .then(async (response) => {
              console.log(response)
              if(response.token) {
                dispatch(loginData(response));
                navigate("/user");  
              } else if(response.response.data.message == "Incorrect Password") {
                errors.password = "Incorrect password"
              } else if(response.response.data.message == "User not found" || response.response.data.message == "Invalid email") {
                errors.email = "Incorrect email"
              }
                setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              // alert(error.response.data.message);
            });
        },
      });
        return(
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
                                    <h3 className="mb-4">Login</h3>
                                    <div className="form-group mb-3">
                                        <input 
                                            type="email" 
                                            name="email"
                                            className="form-control" 
                                            value={values.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email ? (
                                            <span style={{ color: "red" }}>{errors.email}</span>
                                        ) : null}
                                    </div>
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
                                    <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                    }
                                </form>
                                <p className="mb-2 text-muted">Forgot password? <Link to="forgot-password">Reset</Link></p>
                              </div>
                        </div>
                    </div>
                </div>
        );
}

export default Login;