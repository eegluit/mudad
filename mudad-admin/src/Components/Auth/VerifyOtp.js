import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { verifyUserOtp, verifyForgotOtp, resendOtp } from '../../services/auth';
import { loginData } from '../../redux/reducers/userSlice';

const initialValues = {
  otp1 : '',
  otp2 : '',
  otp3 : '',
  otp4 : ''
}

export const VerifyOtp = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);
    const [timer, setTimer] = useState(59);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [loadingOtpResend, setLoadingOtpResend] = useState(false);
    useEffect(() => {
      const counter = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(counter);
    }, [timer]);

    // useEffect(() => {
    //   if(location.state == ) {

    //   }
    // }, []);

    const verifyOtpSchema = Yup.object({
      otp1: Yup.number().required("Please enter otp."),
      otp2: Yup.number().required("Please enter otp."),
      otp3: Yup.number().required("Please enter otp."),
      otp4: Yup.number().required("Please enter otp."),
    });
    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setErrors } = useFormik({
      initialValues,
      validationSchema: verifyOtpSchema,
      onSubmit: (values) => {
        setLoading(true);
        const data = {
          token : userInfo.token,
          otp : values.otp1 + values.otp2 + values.otp3 + values.otp4 
        }
        console.log(data);
        if(location.state == 'forgot') {
          verifyForgotOtp(data)
          .then(async (response) => {
            if(response.token) {
              navigate('/reset-password', {state: response.token});
            } else {
              setErrors({invalid :  response.response.data.message})  
            }
              setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            // alert(error.response.data.message);
          });
        } else {
          verifyUserOtp(data)
            .then(async (response) => {
              console.log(response)
              if(response.user) {
                console.log('alert');
                dispatch(loginData(response));
                navigate('/user');
              } else if(response.response.data.code == 400) {
                setErrors({invalid :  response.response.data.message})  
              } else if(response.response.data.code == 401) {
                navigate('/')
              } 
                setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              // alert(error.response.data.message);
            });
        }
      },
    });
    const inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
          const next = elmnt.target.tabIndex - 2;
          if (next > -1) {
    
            elmnt.target.form.elements[next].focus()
          }
        }
        else {
          console.log("next");
         
            const next = elmnt.target.tabIndex;
            if (next < 4) {
              elmnt.target.form.elements[next].focus()
            }
        }
    
    }
    
    const handleResend = () => {
      setLoadingOtpResend(true)
      const data = {
        token : userInfo.token.access
      }
      resendOtp(data)
        .then(res => {
          setLoadingOtpResend(false)
          if(res.code) {
            navigate('/');
          } else if(res.message) {
            setMessage(res.message)
            setTimeout(() => {
              setMessage('')
              setTimer(59);
            }, 3000);
          }
        })
        .catch(err => {
          console.log(err);
          setLoadingOtpResend(false)
        })
    }
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
                <form onSubmit={handleSubmit}>
                <h3 className="mb-4">Verify Otp</h3>
                <h4 className='mb-4'>Please enter otp sent on your email</h4>
                <div className='input-otp d-flex flex-row justify-content-center mt-2'>

                    <input
                    name="otp1"
                    type="text"
                    autoComplete="off"
                    className="otpInput m-2 text-center form-control rounded"
                    value={values.otp1}
                    onChange={handleChange}
                    tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                
                    <input
                    name="otp2"
                    type="text"
                    autoComplete="off"
                    className="otpInput m-2 text-center form-control rounded"
                    value={values.otp2}
                    onChange={handleChange}
                    tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                    <input
                    name="otp3"
                    type="text"
                    autoComplete="off"
                    className="otpInput m-2 text-center form-control rounded"
                    value={values.otp3}
                    onChange={handleChange}
                    tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                    <input
                    name="otp4"
                    type="text"
                    autoComplete="off"
                    className="otpInput m-2 text-center form-control rounded"
                    value={values.otp4}
                    onChange={handleChange}
                    tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                    />
                </div>
                    {
                      errors.invalid ? 
                      <span className='text-danger'>{errors.invalid}</span> : 
                      Object.keys(errors).length > 0 && Object.keys(errors).length > 0 ? 
                      <span className='text-danger'>Please enter otp</span> : null
                    }
                {
                  loadingOtpResend ?  <div class="spinner-border spinner-border-sm text-light" role="status"></div> : message != '' ? <span className='text-success'>{message}</span> : timer == 0 ? <div className="resend-otp mb-2"><Link onClick={handleResend}>Resend Otp</Link></div> : 
                  <p className="mb-2"><span className='text-success'>00:{timer}</span></p>
                  
                }
                <p className="mb-2">There might be some delay in receiving the OTP due to heavy traffic</p>
                {
                  loading ? <div className="btn btn-primary shadow-2 mb-4">
                  <div class="spinner-border spinner-border-sm text-light" role="status"></div>
                </div> : 
                <button className="btn btn-primary shadow-2 mb-4" type="submit">
                    Submit
                </button>
                }
                </form>
                {/* <button className="btn btn-primary shadow-2 mb-4">
                    Cancel
                </button> */}
                </div>
                        </div>
                    </div>
                </div>
    );
}
