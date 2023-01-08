import './App.css';
import {useSelector} from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {Login} from './Components/Auth/Login';
import {VerifyOtp} from './Components/Auth/VerifyOtp';
import {ResetPassword} from './Components/Auth/ResetPassword';
import {ForgotPassword} from './Components/Auth/ForgotPassword';
import {User} from './Components/User/User';
import { MainTemp } from './Components/Maintemp/MainTemp';
import {Merchant} from './Components/User/Merchant';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route element={<Header />}> */}
          <Route path="/" element={<Login />} />
          <Route path='/verify-otp' element={<VerifyOtp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route element={<AuthUser />}>
            <Route element={<MainTemp />}>
              <Route path="/user" element={<User />} />
              <Route path="/merchant" element={<Merchant />} />
            </Route>
          </Route>
          {/* <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route element={<Footer />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-project" element={<AddProject />} />
          </Route> */}
      </Routes>
    </Router>
  );
}

const AuthUser = () => {
  const userInfo = useSelector((state) => state.userInfo);
  console.log(userInfo)
  return userInfo.token.access ? <Outlet /> : <Navigate to={"/"} />;
};

export default App;
