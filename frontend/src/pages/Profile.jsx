import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
    FaArrowLeft, 
    FaUser, 
    FaEnvelope, 
    FaGraduationCap, 
    FaEdit, 
    FaCrown,
    FaChalkboardTeacher,
    FaBook,
    FaStar,
    FaCalendar,
    FaMapMarkerAlt,
    FaPhone,
    FaLinkedin,
    FaGithub,
    FaTwitter
} from 'react-icons/fa'
import { HiSparkles, HiAcademicCap } from 'react-icons/hi'
import { MdDashboard, MdSettings } from 'react-icons/md'

function Profile() {
  const { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Debug userData
  useEffect(() => {
    console.log("Profile page - Current userData:", userData)
  }, [userData])

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Get role-specific data
  const getRoleIcon = (role) => {
    switch(role?.toLowerCase()) {
      case 'instructor':
      case 'teacher':
        return <FaChalkboardTeacher className="w-5 h-5 text-blue-400" />
      case 'student':
        return <FaGraduationCap className="w-5 h-5 text-green-400" />
      case 'admin':
        return <FaCrown className="w-5 h-5 text-yellow-500" />
      default:
        return <FaUser className="w-5 h-5 text-gray-400" />
    }
  }

  const getRoleBadgeColor = (role) => {
    switch(role?.toLowerCase()) {
      case 'instructor':
      case 'teacher':
        return 'bg-gradient-to-r from-blue-500 to-blue-600'
      case 'student':
        return 'bg-gradient-to-r from-green-500 to-green-600'
      case 'admin':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600'
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 relative overflow-hidden'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            <FaArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
        </div>

        {/* Main Container */}
        <div className={`max-w-4xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}`}>
          
          {/* Profile Header Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              
              {/* Profile Avatar */}
              <div className="relative">
                <div className='w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30 shadow-2xl'>
                  {userData?.name?.slice(0,1).toUpperCase()}
                </div>
                
                {/* Online Status */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {userData.name}
                  </h1>
                  <div className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${getRoleBadgeColor(userData.role)} shadow-lg flex items-center gap-2`}>
                    {getRoleIcon(userData.role)}
                    {userData.role?.charAt(0).toUpperCase() + userData.role?.slice(1)}
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg mb-4">
                  {userData.description || "Welcome to EduLearn! Update your profile to add a bio."}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userData.enrolledCourses?.length || 0}</div>
                    <div className="text-gray-400 text-sm">Enrolled Courses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">
                      {userData.role === 'instructor' ? '12' : '89'}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {userData.role === 'instructor' ? 'Courses Created' : 'Hours Learned'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">4.8</div>
                    <div className="text-gray-400 text-sm">Rating</div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/editprofile")}
                  className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FaEdit className="w-4 h-4" />
                    Edit Profile
                  </span>
                </button>
                
                <button
                  onClick={() => navigate("/")}
                  className="group px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <MdDashboard className="w-4 h-4" />
                    Dashboard
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 mb-8">
            <div className="flex flex-wrap justify-center md:justify-start p-2">
              {[
                { id: 'overview', label: 'Overview', icon: FaUser },
                { id: 'courses', label: 'My Courses', icon: FaBook },
                { id: 'achievements', label: 'Achievements', icon: FaStar },
                { id: 'settings', label: 'Settings', icon: MdSettings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HiSparkles className="w-6 h-6 text-yellow-400" />
                  Profile Overview
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                    
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <FaEnvelope className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-gray-300 text-sm">Email</div>
                        <div className="text-white font-medium">{userData.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <FaCalendar className="w-5 h-5 text-green-400" />
                      <div>
                        <div className="text-gray-300 text-sm">Member Since</div>
                        <div className="text-white font-medium">January 2024</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <FaMapMarkerAlt className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="text-gray-300 text-sm">Location</div>
                        <div className="text-white font-medium">Not specified</div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Progress */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Learning Progress</h3>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Course Completion</span>
                        <span className="text-white font-semibold">75%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Study Streak</span>
                        <span className="text-white font-semibold">12 days</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">Skill Level</span>
                        <span className="text-white font-semibold">Intermediate</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <HiAcademicCap className="w-6 h-6 text-blue-400" />
                  My Courses ({userData.enrolledCourses?.length || 0})
                </h2>
                
                {userData.enrolledCourses?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Course cards would go here */}
                    <div className="text-center text-gray-300 py-8">
                      <FaBook className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                      <p>Course details will be displayed here</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-300 py-12">
                    <FaBook className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <h3 className="text-xl font-semibold mb-2">No Courses Yet</h3>
                    <p className="mb-6">Start your learning journey by enrolling in a course</p>
                    <button
                      onClick={() => navigate("/courses")}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <FaStar className="w-6 h-6 text-yellow-400" />
                  Achievements & Badges
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Achievement badges */}
                  {[
                    { title: 'First Course', desc: 'Completed your first course', icon: FaGraduationCap, color: 'from-blue-500 to-blue-600', earned: true },
                    { title: 'Quick Learner', desc: 'Completed 5 courses', icon: HiSparkles, color: 'from-green-500 to-green-600', earned: false },
                    { title: 'Consistent', desc: '30-day study streak', icon: FaStar, color: 'from-yellow-500 to-orange-500', earned: false }
                  ].map((achievement, index) => (
                    <div key={index} className={`p-6 bg-white/5 rounded-xl border border-white/10 text-center ${!achievement.earned ? 'opacity-50' : ''}`}>
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center`}>
                        <achievement.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-gray-400 text-sm">{achievement.desc}</p>
                      {achievement.earned && (
                        <div className="mt-2 text-green-400 text-sm font-medium">✓ Earned</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <MdSettings className="w-6 h-6 text-gray-400" />
                  Account Settings
                </h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Email Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive updates about your courses</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">Get notified about new content</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h3 className="text-white font-medium mb-2">Danger Zone</h3>
                    <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all data</p>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 cursor-pointer">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
