import React, { useState, useEffect } from 'react'
import logo from '../assets/Edu.png'
import axios from 'axios'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { 
    FaEye, 
    FaEyeSlash, 
    FaUser, 
    FaEnvelope, 
    FaLock, 
    FaUserGraduate,
    FaChalkboardTeacher,
    FaArrowRight
} from 'react-icons/fa'
function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [focusedField, setFocusedField] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        // Basic validation
        if (!name.trim()) {
            toast.error("Please enter your name")
            return
        }
        if (!email.trim()) {
            toast.error("Please enter your email")
            return
        }
        if (!password.trim()) {
            toast.error("Please enter your password")
            return
        }
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long")
            return
        }
        
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", {
                name: name.trim(), 
                email: email.trim(), 
                password: password.trim(), 
                role: role.trim()
            }, { withCredentials: true })
            
            dispatch(setUserData(result.data))
            toast.success("Account created successfully!")
            setTimeout(() => navigate("/"), 1000)
        } catch (error) {
            console.log("SignUp error:", error)
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.")
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
            <div className={`w-full max-w-5xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
                
                <div className="flex flex-col lg:flex-row min-h-[580px]">
                    
                    {/* Left Panel - SignUp Form */}
                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                        
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Let's Get Started
                            </h1>
                            <p className="text-gray-300 text-base">
                                Create your account
                            </p>
                        </div>

                        {/* SignUp Form */}
                        <form onSubmit={handleSignUp} className="space-y-4 max-w-sm mx-auto w-full">
                            
                            {/* Name Field */}
                            <div className="relative">
                                <label htmlFor="name" className="text-white font-medium mb-1 flex items-center gap-2 text-sm">
                                    <FaUser className="w-3 h-3 text-green-400" />
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full px-3 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                                        focusedField === 'name' ? 'border-green-400 focus:ring-green-400/50 bg-white/20' : 'border-white/30'
                                    }`}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email Field */}
                            <div className="relative">
                                <label htmlFor="email" className="text-white font-medium mb-1 flex items-center gap-2 text-sm">
                                    <FaEnvelope className="w-3 h-3 text-blue-400" />
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField('')}
                                    className={`w-full px-3 py-2 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                                        focusedField === 'email' ? 'border-blue-400 focus:ring-blue-400/50 bg-white/20' : 'border-white/30'
                                    }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label htmlFor="password" className="text-white font-medium mb-1 flex items-center gap-2 text-sm">
                                    <FaLock className="w-3 h-3 text-purple-400" />
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
                                        className={`w-full px-3 py-2 pr-10 bg-white/10 backdrop-blur-sm border rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                                            focusedField === 'password' ? 'border-purple-400 focus:ring-purple-400/50 bg-white/20' : 'border-white/30'
                                        }`}
                                        placeholder="Min 8 characters"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="relative">
                                <label className="text-white font-medium mb-2 block text-sm">Choose Your Role</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setRole("student")}
                                        className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                                            role === 'student' 
                                                ? 'border-blue-400 bg-blue-400/20 text-white' 
                                                : 'border-white/30 bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        <FaUserGraduate className="w-4 h-4 mx-auto mb-1" />
                                        <span className="block font-medium text-xs">Student</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("educator")}
                                        className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                                            role === 'educator' 
                                                ? 'border-purple-400 bg-purple-400/20 text-white' 
                                                : 'border-white/30 bg-white/10 text-gray-300 hover:bg-white/20'
                                        }`}
                                    >
                                        <FaChalkboardTeacher className="w-4 h-4 mx-auto mb-1" />
                                        <span className="block font-medium text-xs">Educator</span>
                                    </button>
                                </div>
                            </div>

                            {/* SignUp Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm"
                            >
                                {loading ? (
                                    <ClipLoader size={16} color="white" />
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Create Account
                                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center">
                                <span className="text-gray-300 text-sm">Already have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 text-sm cursor-pointer"
                                >
                                    Login here
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Panel - Branding */}
                    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-sm flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                        
                        <div className="relative z-10 text-center">
                            {/* Logo */}
                            <div className="mb-6">
                                <img 
                                    src={logo} 
                                    className="w-16 h-16 mx-auto rounded-xl shadow-xl border-2 border-white/20" 
                                    alt="EduLearn Logo" 
                                />
                            </div>

                            {/* Brand Name */}
                            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                EduLearn
                            </h2>
                            <p className="text-lg text-gray-300 mb-4">
                                Learning Management System
                            </p>
                            <p className="text-gray-400 text-center text-sm max-w-xs leading-relaxed">
                                Join thousands of learners and educators in our comprehensive learning platform. Start your journey today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
