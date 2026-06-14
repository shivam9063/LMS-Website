import React, { useState, useEffect } from 'react'
import logo from '../assets/Edu.png'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { 
  FaEye, FaEyeSlash, FaEnvelope, FaLock, FaGoogle, FaFacebook, 
  FaGithub, FaArrowRight, FaGraduationCap, FaUsers, FaStar 
} from 'react-icons/fa'
import { HiSparkles, HiLightBulb } from 'react-icons/hi'
import { MdLogin, MdSchool } from 'react-icons/md'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [focusedField, setFocusedField] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Animation on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 300)
        return () => clearTimeout(timer)
    }, [])
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            toast.error("Please fill in all fields")
            return
        }
        
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/login", { email, password }, { withCredentials: true })
            dispatch(setUserData(result.data))
            toast.success("Login Successfully")
            setTimeout(() => navigate("/"), 1000)
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden'>
            
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Main Container */}
            <div className={`w-full max-w-6xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
                
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                    
                    {/* Left Panel - Login Form */}
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                        
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Welcome Back
                            </h1>
                            <p className="text-gray-300 text-lg">
                                Login to your account
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto w-full">
                            
                            {/* Email Field */}
                            <div className="relative">
                                <label htmlFor="email" className="text-white font-semibold mb-2 flex items-center gap-2">
                                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
                                        className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            focusedField === 'email' ? 'border-blue-400 focus:ring-blue-400/50 bg-white/20' : 'border-white/30'
                                        }`}
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                        focusedField === 'email' ? 'opacity-100' : ''
                                    }`}></div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password" className="text-white font-semibold mb-2 flex items-center gap-2">
                                    <FaLock className="w-4 h-4 text-purple-400" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField('')}
                                        className={`w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ${
                                            focusedField === 'password' ? 'border-purple-400 focus:ring-purple-400/50 bg-white/20' : 'border-white/30'
                                        }`}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors cursor-pointer duration-200"
                                    >
                                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${
                                        focusedField === 'password' ? 'opacity-100' : ''
                                    }`}></div>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => navigate("/forgotpassword")}
                                    className="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors duration-200 cursor-pointer"
                                >
                                    Forgot your password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                            >
                                {loading ? (
                                    <ClipLoader size={20} color="white" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Login to Dashboard
                                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                )}
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-gray-300">Don't have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => navigate("/signup")}
                                    className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 cursor-pointer"
                                >
                                    Sign up here
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Panel - Branding */}
                    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm flex-col items-center justify-center p-12 text-white relative overflow-hidden">
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
                            <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
                            <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
                        </div>

                        <div className="relative z-10 text-center">
                            {/* Logo */}
                            <div className="mb-8">
                                <img 
                                    src={logo} 
                                    className="w-24 h-24 mx-auto rounded-2xl shadow-2xl border-4 border-white/20" 
                                    alt="EduLearn Logo" 
                                />
                            </div>

                            {/* Brand Name */}
                            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                EduLearn
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Learning Management System
                            </p>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
