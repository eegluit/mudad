import React from "react";
import { Link, Outlet } from "react-router-dom";
import {FiUsers} from 'react-icons/fi';
import {AiOutlinePoweroff} from 'react-icons/ai';

export const MainTemp = () => {
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
                  <li>
                    <Link
                      className="nav-link active"
                      target=""
                      href="/datta-able/react/default/dashboard/default"
                      aria-current="page"
                    >
                      <span className="pcoded-micon">
                        <i className="feather icon-home">{<FiUsers />}</i>
                      </span>
                      <span className="pcoded-mtext">User</span>
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
                    <i className="icon feather icon-mail">
                        <AiOutlinePoweroff />
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
