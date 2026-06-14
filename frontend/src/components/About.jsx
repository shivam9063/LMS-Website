import React, { useState, useEffect, useRef } from 'react'
import about from "../assets/about.jpg"
import VideoPlayer from './VideoPlayer'
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaGraduationCap, FaUsers, FaTrophy, FaRocket, FaPlay, FaStar, FaChartLine, FaLightbulb } from "react-icons/fa";
import { HiSparkles, HiAcademicCap } from "react-icons/hi";
import { MdTrendingUp, MdSchool } from "react-icons/md";
import { BsLightningFill, BsAward } from "react-icons/bs";
function About() {
  const [isInView, setIsInView] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    students: 0,
    courses: 0,
    instructors: 0,
    rating: 0
  });
  
  const sectionRef = useRef(null);
  const statsRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Stats animation
  useEffect(() => {
    if (isInView) {
      const finalStats = { students: 10000, courses: 150, instructors: 50, rating: 4.8 };
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          students: Math.floor(finalStats.students * progress),
          courses: Math.floor(finalStats.courses * progress),
          instructors: Math.floor(finalStats.instructors * progress),
          rating: (finalStats.rating * progress).toFixed(1)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={sectionRef} className='relative w-full min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        
        {/* Main Content */}
        <div className='flex flex-col lg:flex-row items-center justify-center gap-12 mb-20'>
          
          {/* Image Section */}
          <div className={`lg:w-1/2 w-full flex items-center justify-center relative transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative group">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700">
                <img 
                  src={about} 
                  className='w-full max-w-md h-96 object-cover' 
                  alt="About Learning" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Video Player */}
              <div className="absolute inset-0 flex items-center justify-center">
                <VideoPlayer />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl animate-bounce">
                <FaGraduationCap className="text-white w-8 h-8" />
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
                <BsLightningFill className="text-white w-8 h-8" />
              </div>

              {/* Achievement Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-500 w-4 h-4" />
                  <span className="text-sm font-semibold text-gray-800">Award Winning</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`lg:w-1/2 w-full flex flex-col items-start justify-center space-y-8 transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            
            {/* Section Badge */}
            <div className='flex items-center gap-4 text-lg'>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                <HiSparkles className="w-4 h-4" />
                About Us
              </span>
              <TfiLayoutLineSolid className='w-12 h-12 text-gray-300'/>
            </div>
            
            {/* Main Heading */}
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight'>
              We 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Maximize </span>
              Your Learning Growth
            </h2>
            
            {/* Description */}
            <p className='text-lg text-gray-600 leading-relaxed max-w-2xl'>
              We provide a cutting-edge Learning Management System that revolutionizes online education, 
              empowering students and instructors with intelligent tools for seamless collaboration and accelerated growth.
            </p>

            {/* Interactive Features Grid */}
            <div className='grid grid-cols-2 gap-6 w-full max-w-2xl'>
              {[
                { icon: FaLightbulb, title: 'Smart Learning', desc: 'AI-powered personalized learning paths' },
                { icon: FaUsers, title: 'Expert Mentors', desc: 'Industry professionals guide you' },
                { icon: FaChartLine, title: 'Track Progress', desc: 'Real-time analytics and insights' },
                { icon: BsAward, title: 'Certifications', desc: 'Industry-recognized credentials' }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 ${activeFeature === index ? 'ring-2 ring-blue-500 bg-blue-50/50' : ''}`}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${activeFeature === index ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-blue-500 group-hover:text-white'}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ${activeFeature === index ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              <span>Start Your Journey</span>
              <FaRocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: FaUsers, value: animatedStats.students, suffix: '+', label: 'Happy Students', color: 'from-blue-500 to-cyan-500' },
            { icon: MdSchool, value: animatedStats.courses, suffix: '+', label: 'Online Courses', color: 'from-purple-500 to-pink-500' },
            { icon: HiAcademicCap, value: animatedStats.instructors, suffix: '+', label: 'Expert Instructors', color: 'from-orange-500 to-red-500' },
            { icon: FaStar, value: animatedStats.rating, suffix: '/5', label: 'Student Rating', color: 'from-green-500 to-teal-500' }
          ].map((stat, index) => (
            <div key={index} className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4">
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-white w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
