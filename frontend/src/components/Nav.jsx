import React, { useState, useEffect } from 'react'
import logo from "../assets/Edu.png"
import { IoMdPerson, IoMdHome, IoMdBook } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboard, MdLogout, MdLogin, MdClose } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { FaUserCircle, FaGraduationCap, FaCertificate } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Nav() {
  let [showHam,setShowHam] = useState(false)
  let [showPro,setShowPro] = useState(false)
  let [scrolled, setScrolled] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setShowPro(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
      console.log(result.data)
     await dispatch(setUserData(null))
      toast.success("LogOut Successfully")
      setShowPro(false)
      setShowHam(false)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }

  const handleNavigation = (path) => {
    navigate(path)
    setShowHam(false)
    setShowPro(false)
  }
  return (
    <>
      {/* Main Navbar */}
      <nav className={`w-full h-[80px] fixed top-0 px-4 lg:px-8 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-gradient-to-r from-black/50 to-transparent backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavigation("/")}
            >
              <div className="relative">
                <img 
                  src={logo} 
                  className="w-12 h-12 rounded-xl border-2 border-white/30 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110 shadow-lg" 
                  alt="LMS Logo" 
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold ${scrolled ? 'text-gray-800' : 'text-white'} group-hover:text-blue-500 transition-colors duration-300`}>
                  EduLearn
                </h1>
                <p className={`text-xs ${scrolled ? 'text-gray-600' : 'text-gray-300'}`}>
                  Learning Management System
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleNavigation("/")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all cursor-pointer duration-300 hover:scale-105 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600' 
                    : 'text-white hover:bg-white/10 hover:text-blue-300'
                }`}
              >
                <IoMdHome className="w-5 h-5" />
                <span>Home</span>
              </button>
              
              <button
                onClick={() => handleNavigation("/allcourses")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600' 
                    : 'text-white hover:bg-white/10 hover:text-blue-300'
                }`}
              >
                <IoMdBook className="w-5 h-5" />
                <span>Courses</span>
              </button>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              
              
              {/* Dashboard Button for Educators */}
              {userData?.role === "educator" && (
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <MdDashboard className="w-5 h-5" />
                  <span className="font-medium">Dashboard</span>
                </button>
              )}

              {/* Profile Section */}
              <div className="relative profile-dropdown">
                {!userData ? (
                  <button
                    onClick={() => setShowPro(prev => !prev)}
                    className={`p-3 rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                      scrolled 
                        ? 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50' 
                        : 'border-white/50 text-white hover:border-blue-400 hover:bg-white/10'
                    }`}
                  >
                    <IoMdPerson className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPro(prev => !prev)}
                    className="relative group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-white/50 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110 overflow-hidden">
                      {userData.photoUrl ? (
                        <img 
                          src={userData.photoUrl} 
                          className="w-full h-full object-cover" 
                          alt="Profile" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {userData?.name?.slice(0,1).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  </button>
                )}

                {/* Profile Dropdown */}
                {showPro && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      {userData ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {userData.photoUrl ? (
                              <img src={userData.photoUrl} className="w-full h-full rounded-full object-cover" alt="" />
                            ) : (
                              userData?.name?.slice(0,1).toUpperCase()
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{userData.name}</p>
                            <p className="text-sm text-gray-600">{userData.email}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-600">Welcome, Guest!</p>
                      )}
                    </div>
                    
                    <div className="py-2">
                      {userData ? (
                        <>
                          <button
                            onClick={() => handleNavigation("/profile")}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                          >
                            <FaUserCircle className="w-5 h-5" />
                            <span>My Profile</span>
                          </button>
                          <button
                            onClick={() => handleNavigation("/enrolledcourses")}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                          >
                            <FaGraduationCap className="w-5 h-5" />
                            <span>My Courses</span>
                          </button>
                          <button
                            onClick={() => handleNavigation("/completedcourses")}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                          >
                            <FaCertificate className="w-5 h-5" />
                            <span>My Certificates</span>
                          </button>
                          <div className="border-t border-gray-100 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                          >
                            <MdLogout className="w-5 h-5" />
                            <span>Logout</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleNavigation("/login")}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-blue-600 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                        >
                          <MdLogin className="w-5 h-5" />
                          <span>Login</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Login/Logout Button */}
              {!userData ? (
                <button
                  onClick={() => handleNavigation("/login")}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <MdLogin className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 cursor-pointer hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <MdLogout className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowHam(prev => !prev)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <GiHamburgerMenu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        showHam 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowHam(false)} />
        
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-500 ${
          showHam ? 'translate-x-0' : 'translate-x-full'
        }`}>
          
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img src={logo} className="w-10 h-10 rounded-lg" alt="Logo" />
              <div>
                <h2 className="font-bold text-gray-800">EduLearn</h2>
                <p className="text-xs text-gray-600">LMS</p>
              </div>
            </div>
            {/* Secondary close button in header */}
            <button
              onClick={() => setShowHam(false)}
              className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-110"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex flex-col h-full">
            
            {/* User Profile Section */}
            <div className="p-6 border-b border-gray-200">
              {userData ? (
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {userData.photoUrl ? (
                      <img src={userData.photoUrl} className="w-full h-full rounded-full object-cover" alt="" />
                    ) : (
                      userData?.name?.slice(0,1).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{userData.name}</h3>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full mt-1">
                      {userData.role}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                    <IoMdPerson className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-600">Welcome, Guest!</p>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 py-4">
              <nav className="space-y-2 px-4">
                <button
                  onClick={() => handleNavigation("/")}
                  className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                >
                  <IoMdHome className="w-6 h-6" />
                  <span className="font-medium">Home</span>
                </button>
                
                <button
                  onClick={() => handleNavigation("/allcourses")}
                  className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                >
                  <IoMdBook className="w-6 h-6" />
                  <span className="font-medium">All Courses</span>
                </button>

                {userData && (
                  <>
                    <button
                      onClick={() => handleNavigation("/profile")}
                      className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                    >
                      <FaUserCircle className="w-6 h-6" />
                      <span className="font-medium">My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigation("/enrolledcourses")}
                      className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                    >
                      <FaGraduationCap className="w-6 h-6" />
                      <span className="font-medium">My Courses</span>
                    </button>

                    <button
                      onClick={() => handleNavigation("/completedcourses")}
                      className="w-full flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                    >
                      <FaCertificate className="w-6 h-6" />
                      <span className="font-medium">My Certificates</span>
                    </button>

                    {userData.role === "educator" && (
                      <button
                        onClick={() => handleNavigation("/dashboard")}
                        className="w-full flex items-center space-x-4 px-4 py-3 text-purple-700 hover:bg-purple-50 hover:text-purple-800 rounded-lg transition-colors duration-200"
                      >
                        <MdDashboard className="w-6 h-6" />
                        <span className="font-medium">Dashboard</span>
                      </button>
                    )}

                    {/* Logout option in navigation menu */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-4 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200"
                    >
                      <MdLogout className="w-6 h-6" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                )}

                {/* Login option for non-logged users */}
                {!userData && (
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="w-full flex items-center space-x-4 px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <MdLogin className="w-6 h-6" />
                    <span className="font-medium">Login</span>
                  </button>
                )}
              </nav>
            </div>

            {/* Mobile Menu Footer */}
            <div className="p-6 border-t border-gray-200">
              {!userData ? (
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  <MdLogin className="w-6 h-6" />
                  <span>Login to Continue</span>
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium cursor-pointer"
                >
                  <MdLogout className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav