import "./App.css";
import {Route,Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import { useState } from "react";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from './components/core/Dashboard/MyProfile';
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart"
import { useSelector } from "react-redux";
import Catalog from "./pages/Catalog";
import Course from "./pages/Course";

function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Navbar>
      <Routes>

        <Route path="/" 
        element={<Home/>} 
        />

        <Route path="/signup" 
              element={
              <OpenRoute>
                <Signup />
              </OpenRoute>}/>

        <Route path="/login"
         element={
            <OpenRoute>
              <Login />
            </OpenRoute>}/>

        <Route path="/forgot-password" 
        element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>}/>

        <Route path="/update-password/:id" 
        element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>}/>

        <Route path="/verify-email" 
        element={ 
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>}/>

          <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>

        <Route path="/catalog/:categoryId" element={<Catalog />}/>
            
        
        <Route element={  
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>}>
              <Route path="/dashboard/my-profile" element={<MyProfile />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              {user?.accountType === "Student" && (
                <>
                 <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                 <Route path="/course/:courseId" element={<Course />}/>
                 <Route path="/dashboard/wishlist" element={<Cart />} />
                </>
              )
              }
              { user?.accountType === "Instructor" && (
                <>
                {/* <Route path="/dashboard/my-courses" element={<MyCourses/> }/> */}
                </>
              )

              }
        </Route>

        <Route path="*" element={<Error />}/>
      </Routes>
    </div>
  );
}

export default App;
