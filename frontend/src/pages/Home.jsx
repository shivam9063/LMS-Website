import React, { useState, useEffect } from 'react'
import backgroundVideo from "../assets/video.mp4"
import Nav from '../components/Nav'
import { SiViaplay } from "react-icons/si";
import { FaPlay, FaGraduationCap, FaUsers, FaAward, FaStar } from "react-icons/fa";
import { MdPlayArrow, MdTrendingUp } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    // Fade in animation on component mount
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Stats animation trigger
    const statsTimer = setTimeout(() => {
      setStatsVisible(true)
    }, 1500)

    return () => {
      clearTimeout(timer)
      clearTimeout(statsTimer)
    }
  }, [])

  // Stats data
  const stats = [
    { icon: FaUsers, count: "10,000+", label: "Active Students" },
    { icon: FaGraduationCap, count: "500+", label: "Expert Instructors" },
    { icon: FaAward, count: "1,000+", label: "Courses Available" },
    { icon: FaStar, count: "4.9", label: "Average Rating" }
  ]

  return (
    <div className='w-full overflow-hidden'>
      
      {/* Hero Section with Background Video */}
      <div className='relative w-full h-screen overflow-hidden'>
        <Nav/>
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Overlay */}
          <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pt-24">
          
          {/* Main Heading with Animation */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="block text-white font-bold drop-shadow-2xl shadow-black mb-2" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                  Grow Your Skills to
                </span>
                <span className="block font-bold drop-shadow-2xl shadow-black" style={{
                  background: 'linear-gradient(90deg, #60A5FA 0%, #A855F7 50%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                  Advance Your Career
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
                Transform your future with world-class courses from industry experts. 
                <span className="block mt-2 text-lg text-blue-300">
                  Join thousands of learners achieving their dreams every day.
                </span>
              </p>
            </div>

            {/* Interactive Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
              
              {/* Primary CTA Button */}
              <button 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-semibold cursor-pointer shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden"
                onClick={() => navigate("/allcourses")}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <FaGraduationCap className="w-5 h-5" />
                  Explore All Courses
                  <MdPlayArrow className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Secondary CTA Button */}
              <button 
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-full text-lg  font-semibold hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => navigate("/searchwithai")}
              >
                <span className="flex items-center gap-3">
                  <HiSparkles className="w-5 h-5 text-yellow-400" />
                  Search with AI
                  <img src={ai} className='w-6 h-6 rounded-full' alt="AI" />
                </span>
              </button>
            </div>

            {/* Floating Stats Cards */}
            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-16 transition-all duration-1000 delay-500 transform ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {stats.map((stat, index) => (
                <div key={index} className="group bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex flex-col items-center text-center">
                    <stat.icon className="w-6 h-6 text-blue-400 mb-2 group-hover:text-purple-400 transition-colors duration-300" />
                    <div className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                      {stat.count}
                    </div>
                    <div className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-white/70 text-sm mt-2">Scroll to explore</p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      {/* Enhanced Content Sections */}
      <div className="relative">

        {/* Company Logos */}
        <div className="py-6">
          <Logos/>
        </div>

        {/* Explore Courses Section */}
        <div className="py-6">
          <ExploreCourses/>
        </div>

        {/* Interactive Cards */}
        <div className="py-6">
          <Cardspage/>
        </div>

        {/* About Section with Modern Design */}
        <div className="py-6">
          <About/>
        </div>

        {/* Reviews Section */}
        <div className="py-6">
          <ReviewPage/>
        </div>

        {/* Call to Action Section */}
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their careers with our expert-led courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
                onClick={() => navigate("/signup")}
              >
                Get Started Today
              </button>
              <button 
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/allcourses")}
              >
                Browse Courses
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </div>

  ) 
}

export default Home
