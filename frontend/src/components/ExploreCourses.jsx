import React, { useState, useEffect, useRef } from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut, MdTrendingUp, MdStar } from "react-icons/md";
import { FaHackerrank, FaArrowRight, FaUsers, FaBookOpen } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardDataFill, BsLightningFill } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { HiSparkles, HiAcademicCap } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
function ExploreCourses() {
  const navigate = useNavigate()
  const [hoveredCourse, setHoveredCourse] = useState(null)
  const [visibleCourses, setVisibleCourses] = useState([])
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)

  // Course data with enhanced information
  const courses = [
    {
      id: 'web-dev',
      icon: TbDeviceDesktopAnalytics,
      title: 'Web Development',
      subtitle: 'Frontend & Backend',
      gradient: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      students: '12.5k',
      rating: '4.8',
      trending: true
    },
    {
      id: 'ui-ux',
      icon: LiaUikit,
      title: 'UI/UX Design',
      subtitle: 'User Experience',
      gradient: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      students: '8.3k',
      rating: '4.9',
      trending: false
    },
    {
      id: 'app-dev',
      icon: MdAppShortcut,
      title: 'App Development',
      subtitle: 'Mobile Apps',
      gradient: 'from-pink-500 to-rose-400',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      students: '9.7k',
      rating: '4.7',
      trending: true
    },
    {
      id: 'ethical-hacking',
      icon: FaHackerrank,
      title: 'Ethical Hacking',
      subtitle: 'Cybersecurity',
      gradient: 'from-purple-500 to-indigo-400',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      students: '6.2k',
      rating: '4.6',
      trending: false
    },
    {
      id: 'ai-ml',
      icon: TbBrandOpenai,
      title: 'AI/ML',
      subtitle: 'Machine Learning',
      gradient: 'from-orange-500 to-yellow-400',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      students: '15.1k',
      rating: '4.9',
      trending: true
    },
    {
      id: 'data-science',
      icon: SiGoogledataproc,
      title: 'Data Science',
      subtitle: 'Big Data Analytics',
      gradient: 'from-teal-500 to-cyan-400',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      students: '11.4k',
      rating: '4.8',
      trending: true
    },
    {
      id: 'data-analytics',
      icon: BsClipboardDataFill,
      title: 'Data Analytics',
      subtitle: 'Business Intelligence',
      gradient: 'from-violet-500 to-purple-400',
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-600',
      students: '7.8k',
      rating: '4.7',
      trending: false
    },
    {
      id: 'ai-tools',
      icon: SiOpenaigym,
      title: 'AI Tools',
      subtitle: 'Latest AI Tech',
      gradient: 'from-emerald-500 to-teal-400',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      students: '13.6k',
      rating: '4.8',
      trending: true
    }
  ]

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Stagger course animations
          courses.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCourses(prev => [...prev, index])
            }, index * 100)
          })
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className='w-full min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10'>
        
        {/* Left Content Section */}
        <div className={`lg:w-2/5 w-full flex flex-col items-start justify-center space-y-6 transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
            <HiAcademicCap className="w-4 h-4" />
            Popular Categories
          </div>

          {/* Main Heading */}
          <div className="space-y-2">
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight'>
              Explore
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Courses
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className='text-lg text-gray-600 leading-relaxed max-w-md'>
            Discover world-class courses designed by industry experts. From beginner to advanced levels, 
            we have everything you need to accelerate your career growth.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FaUsers className="w-4 h-4 text-blue-500" />
              <span>50K+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBookOpen className="w-4 h-4 text-green-500" />
              <span>200+ Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <MdStar className="w-4 h-4 text-yellow-500" />
              <span>4.8 Rating</span>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            className='group mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer'
            onClick={() => navigate("/allcourses")}
          >
            <span>Explore All Courses</span>
            <FaArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
          </button>
        </div>

        {/* Right Courses Grid */}
        <div className='lg:w-3/5 w-full'>
          <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto'>
            {courses.map((course, index) => {
              const Icon = course.icon
              const isVisible = visibleCourses.includes(index)
              const isHovered = hoveredCourse === course.id

              return (
                <div
                  key={course.id}
                  className={`group relative transform transition-all duration-700 cursor-pointer ${
                    isVisible 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  onClick={() => navigate("/allcourses")}
                >
                  {/* Main Card - Fixed Size */}
                  <div className={`relative h-44 w-full p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-3 group-hover:scale-105`}>
                    
                    {/* Trending Badge */}
                    {course.trending && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold rounded-full shadow-md">
                        <HiSparkles className="w-3 h-3" />
                        Hot
                      </div>
                    )}

                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    {/* Glowing Effect */}
                    <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${course.gradient} opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 -z-10`}></div>

                    {/* Icon Container */}
                    <div className="relative mb-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Multiple Pulse Rings */}
                      <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-xl opacity-20 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700`}></div>
                      <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-xl opacity-10 scale-0 group-hover:scale-200 group-hover:opacity-0 transition-all duration-1000 delay-100`}></div>
                    </div>

                    {/* Content */}
                    <div className="relative space-y-3">
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {course.subtitle}
                      </p>
                      
                      {/* Stats Row */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <FaUsers className="w-3 h-3 text-blue-500" />
                          <span className="font-medium">{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MdStar className="w-3 h-3 text-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <div className={`w-8 h-8 bg-gradient-to-r ${course.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <FaArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>

                  {/* Floating Elements */}
                  {isHovered && (
                    <>
                      <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping`} style={{backgroundColor: course.gradient.includes('blue') ? '#3b82f6' : course.gradient.includes('green') ? '#10b981' : course.gradient.includes('pink') ? '#ec4899' : course.gradient.includes('purple') ? '#8b5cf6' : course.gradient.includes('orange') ? '#f59e0b' : course.gradient.includes('teal') ? '#14b8a6' : course.gradient.includes('violet') ? '#8b5cf6' : '#10b981'}}></div>
                      <div className={`absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-pulse delay-300`} style={{backgroundColor: course.gradient.includes('blue') ? '#3b82f6' : course.gradient.includes('green') ? '#10b981' : course.gradient.includes('pink') ? '#ec4899' : course.gradient.includes('purple') ? '#8b5cf6' : course.gradient.includes('orange') ? '#f59e0b' : course.gradient.includes('teal') ? '#14b8a6' : course.gradient.includes('violet') ? '#8b5cf6' : '#10b981', opacity: 0.6}}></div>
                    </>
                  )}
                </div>
              )
            })}
          </div>

          {/* Bottom CTA for Mobile */}
          <div className={`mt-12 text-center lg:hidden transition-all duration-1000 delay-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button 
              className='px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3'
              onClick={() => navigate("/allcourses")}
            >
              <span>View All Courses</span>
              <BsLightningFill className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses
