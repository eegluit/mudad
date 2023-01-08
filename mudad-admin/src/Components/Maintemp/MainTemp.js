import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {FiUsers} from 'react-icons/fi';
import {AiOutlinePoweroff} from 'react-icons/ai';
import {useSelector} from "react-redux";
import { logoutUser } from "../../services/auth";

export const MainTemp = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);

  const handleLogOut = () => {
    console.log('userInfo', userInfo)
    const data = {
      accessToken: userInfo.token.access.token,
    };
    logoutUser(data)
      .then(async (response) => {
        console.log(response);
        if (response.message) {
          navigate('/');
        }
        
      })
      .catch((error) => {
        console.log('err', error);
      });
  }
  const handleClick = (e) => {
    // document.querySelectorAll('nav-link').classList.remove('active-link')
    const elements = document.querySelectorAll('.nav-link');
    console.log('called')
    elements.forEach((element) => {
      element.classList.remove('active');
    });
    let currentEl = e.currentTarget.firstChild.classList.add('active');
    // console.log(currentEl)

  }
  return (
    <>
      <div className="fullscreen">
        <nav className="pcoded-navbar menu-light navbar-default brand-default drp-icon-style1 menu-item-icon-style1 active-default title-default">
          <div className="navbar-wrapper">
            <div className="navbar-brand header-logo">
              <Link href="#!" className="b-brand">
                <div className="b-bg">
                  <i className="feather icon-trending-up"></i>
                </div>
                <span className="b-title">Mudad</span>
              </Link>
            </div>
            <div className="navbar-content datta-scroll">
              <div className="scrollbar-container ps ps--active-y">
                <ul className="nav pcoded-inner-navbar">
                  <li onClick={handleClick}>
                    <Link
                      className="nav-link active"
                      target=""
                      to={'/user'}
                      aria-current="page"
                    >
                      <span className="pcoded-micon">
                        <i className="feather icon-home">{<FiUsers />}</i>
                      </span>
                      <span className="pcoded-mtext">Customer</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link
                      className="nav-link"
                      target=""
                      to={'/merchant'}
                      aria-current="page"
                    >
                      <span className="pcoded-micon">
                        <i className="feather icon-home">{<FiUsers />}</i>
                      </span>
                      <span className="pcoded-mtext">Merchant</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <header className="navbar pcoded-header navbar-expand-lg header-default">
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
                <li className="m-l-15">
                    <i className="icon feather icon-mail logout-btn">
                        <AiOutlinePoweroff onClick={handleLogOut}/>
                    </i>
                </li>
            </ul>

        </div>

      </header>
      <div className="pcoded-main-container">
        <div className="pcoded-content">
          <div className="pcoded-inner-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
