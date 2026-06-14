import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import { toast } from 'react-toastify'
import logo from '../assets/Edu.png'
import {
    FaEnvelope,
    FaLock,
    FaKey,
    FaArrowLeft,
    FaArrowRight,
    FaShieldAlt,
    FaCheckCircle
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'

function ForgotPassword() {
    let navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [newpassword, setNewPassword] = useState("")
    const [conPassword, setConpassword] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [focusedField, setFocusedField] = useState('')

    // Animation on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 300)
        return () => clearTimeout(timer)
    }, [])

    const handleStep1 = async (e) => {
        e.preventDefault()
        if (!email.trim()) {
            toast.error("Please enter your email address")
            return
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
            console.log(result)
            setStep(2)
            toast.success(result.data.message)
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message || "Failed to send OTP")
            setLoading(false)
        }

    }
    const handleStep2 = async (e) => {
        e.preventDefault()
        if (!otp.trim()) {
            toast.error("Please enter the OTP")
            return
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
            console.log(result)

            toast.success(result.data.message)
            setLoading(false)
            setStep(3)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message || "Failed to verify OTP")
            setLoading(false)
        }

    }
    const handleStep3 = async (e) => {
        e.preventDefault()
        if (!newpassword.trim()) {
            toast.error("Please enter your new password")
            return
        }
        if (newpassword.length < 8) {
            toast.error("Password must be at least 8 characters long")
            return
        }
        if (newpassword !== conPassword) {
            return toast.error("Passwords do not match")
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newpassword }, { withCredentials: true })
            console.log(result)
            toast.success(result.data.message)
            setLoading(false)
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || error.message || "Failed to reset password")
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
            <div className={`w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>

                <div className="flex flex-col lg:flex-row min-h-[600px]">

                    {/* Left Panel - Form */}
                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">

                        {/* Step 1 - Email Input */}
                        {step === 1 && (
                            <div className="max-w-md mx-auto w-full">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                                        <FaEnvelope className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Forgot Password?
                                    </h1>
                                    <p className="text-gray-300 text-lg">
                                        Enter your email to receive a reset code
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleStep1} className="space-y-6">

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
                                                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ${focusedField === 'email' ? 'border-blue-400 focus:ring-blue-400/50 bg-white/20' : 'border-white/30'
                                                    }`}
                                                placeholder="Enter your email address"
                                                required
                                            />
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'email' ? 'opacity-100' : ''
                                                }`}></div>
                                        </div>
                                    </div>

                                    {/* Send OTP Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                    >
                                        {loading ? (
                                            <ClipLoader size={20} color="white" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Send Reset Code
                                                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        )}
                                    </button>

                                    {/* Back to Login */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <FaArrowLeft className="w-4 h-4" />
                                            Back to Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 2 - OTP Verification */}
                        {step === 2 && (
                            <div className="max-w-md mx-auto w-full">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                        <FaShieldAlt className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Verify Code
                                    </h1>
                                    <p className="text-gray-300 text-lg">
                                        Enter the verification code sent to
                                    </p>
                                    <p className="text-blue-300 font-semibold">{email}</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleStep2} className="space-y-6">

                                    {/* OTP Field */}
                                    <div className="relative">
                                        <label htmlFor="otp" className="text-white font-semibold mb-2 flex items-center gap-2">
                                            <FaKey className="w-4 h-4 text-green-400" />
                                            Verification Code
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="otp"
                                                type="text"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                onFocus={() => setFocusedField('otp')}
                                                onBlur={() => setFocusedField('')}
                                                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 text-center text-lg tracking-widest ${focusedField === 'otp' ? 'border-green-400 focus:ring-green-400/50 bg-white/20' : 'border-white/30'
                                                    }`}
                                                placeholder="Enter verification code"
                                                maxLength="6"
                                                required
                                            />
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'otp' ? 'opacity-100' : ''
                                                }`}></div>
                                        </div>
                                    </div>

                                    {/* Verify Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group w-full py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                    >
                                        {loading ? (
                                            <ClipLoader size={20} color="white" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <FaCheckCircle className="w-4 h-4" />
                                                Verify Code
                                            </span>
                                        )}
                                    </button>

                                    {/* Back to Login */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <FaArrowLeft className="w-4 h-4" />
                                            Back to Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 3 - Reset Password */}
                        {step === 3 && (
                            <div className="max-w-md mx-auto w-full">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                                        <FaLock className="w-8 h-8 text-white" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        Reset Password
                                    </h1>
                                    <p className="text-gray-300 text-lg">
                                        Create a new secure password
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleStep3} className="space-y-6">

                                    {/* New Password Field */}
                                    <div className="relative">
                                        <label htmlFor="newPassword" className="text-white font-semibold mb-2 flex items-center gap-2">
                                            <FaLock className="w-4 h-4 text-purple-400" />
                                            New Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="newPassword"
                                                type="password"
                                                value={newpassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                onFocus={() => setFocusedField('newPassword')}
                                                onBlur={() => setFocusedField('')}
                                                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ${focusedField === 'newPassword' ? 'border-purple-400 focus:ring-purple-400/50 bg-white/20' : 'border-white/30'
                                                    }`}
                                                placeholder="Enter new password"
                                                minLength="8"
                                                required
                                            />
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'newPassword' ? 'opacity-100' : ''
                                                }`}></div>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="relative">
                                        <label htmlFor="confirmPassword" className="text-white font-semibold mb-2 flex items-center gap-2">
                                            <FaLock className="w-4 h-4 text-pink-400" />
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="confirmPassword"
                                                type="password"
                                                value={conPassword}
                                                onChange={(e) => setConpassword(e.target.value)}
                                                onFocus={() => setFocusedField('confirmPassword')}
                                                onBlur={() => setFocusedField('')}
                                                className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 transition-all duration-300 ${focusedField === 'confirmPassword' ? 'border-pink-400 focus:ring-pink-400/50 bg-white/20' : 'border-white/30'
                                                    }`}
                                                placeholder="Confirm new password"
                                                required
                                            />
                                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 pointer-events-none ${focusedField === 'confirmPassword' ? 'opacity-100' : ''
                                                }`}></div>
                                        </div>
                                    </div>

                                    {/* Reset Button */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                                    >
                                        {loading ? (
                                            <ClipLoader size={20} color="white" />
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <HiSparkles className="w-4 h-4" />
                                                Reset Password
                                            </span>
                                        )}
                                    </button>

                                    {/* Back to Login */}
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="text-blue-300 hover:text-blue-200 font-semibold transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <FaArrowLeft className="w-4 h-4" />
                                            Back to Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
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

                            {/* Step Indicator */}
                            <div className="flex items-center justify-center space-x-4 mb-8">
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-400' : 'bg-white/30'}`}></div>
                                <div className={`w-8 h-0.5 transition-all duration-300 ${step >= 2 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-green-400' : 'bg-white/30'}`}></div>
                                <div className={`w-8 h-0.5 transition-all duration-300 ${step >= 3 ? 'bg-purple-400' : 'bg-white/30'}`}></div>
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-purple-400' : 'bg-white/30'}`}></div>
                            </div>

                            {/* Step Description */}
                            <div className="text-center">
                                {step === 1 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Step 1: Verify Email</h3>
                                        <p className="text-gray-400 text-sm">Enter your email to receive a verification code</p>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Step 2: Verify Code</h3>
                                        <p className="text-gray-400 text-sm">Enter the code sent to your email</p>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Step 3: Reset Password</h3>
                                        <p className="text-gray-400 text-sm">Create a new secure password</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
