import React, { useState, useEffect, useRef } from 'react'
import { MdCastForEducation, MdVerified } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar, FaStar, FaArrowRight } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsShieldCheck } from "react-icons/bs";
function Logos() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [visibleItems, setVisibleItems] = useState([])
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Stagger animation for each item
          features.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Feature data with enhanced styling
  const features = [
    {
      icon: MdCastForEducation,
      title: "20k+ Online Courses",
      subtitle: "Diverse Learning Paths",
      gradient: "from-blue-500 to-cyan-400",
      shadow: "shadow-blue-500/25",
      accent: HiSparkles,
      color: "#1e40af"
    },
    {
      icon: SiOpenaccess,
      title: "Lifetime Access",
      subtitle: "Learn Forever",
      gradient: "from-green-500 to-emerald-400",
      shadow: "shadow-green-500/25",
      accent: FaCheckCircle,
      color: "#059669"
    },
    {
      icon: FaSackDollar,
      title: "Value For Money",
      subtitle: "Best Investment",
      gradient: "from-yellow-500 to-orange-400",
      shadow: "shadow-yellow-500/25",
      accent: FaStar,
      color: "#d97706"
    },
    {
      icon: BiSupport,
      title: "24/7 Support",
      subtitle: "Always Here to Help",
      gradient: "from-purple-500 to-pink-400",
      shadow: "shadow-purple-500/25",
      accent: BsShieldCheck,
      color: "#7c3aed"
    },
    {
      icon: FaUsers,
      title: "Community Support",
      subtitle: "Learn Together",
      gradient: "from-indigo-500 to-blue-400",
      shadow: "shadow-indigo-500/25",
      accent: MdVerified,
      color: "#4338ca"
    }
  ]

  return (
    <div ref={containerRef} className='w-full py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden relative'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <HiLightningBolt className="w-4 h-4" />
          Why Students Choose Us
        </div>
        
        <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Everything You Need for 
          <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Success in Learning
          </span>
        </h2>
        
        <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Join thousands of learners who trust our comprehensive platform for their educational journey
        </p>
      </div>

      {/* Interactive Feature Cards */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const AccentIcon = feature.accent
            const isVisible = visibleItems.includes(index)
            const isHovered = hoveredIndex === index

            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-12 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Main Card */}
                <div className={`relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 ${feature.shadow} hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden group-hover:-translate-y-2 group-hover:scale-105`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  {/* Glowing Border Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10`}></div>

                  {/* Floating Accent */}
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-all duration-300">
                    <AccentIcon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>

                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Pulse Ring */}
                    <div className={`absolute inset-0 w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl opacity-20 scale-0 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700`}></div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-3">
                      {feature.subtitle}
                    </p>
                    
                    {/* Action Indicator */}
                    <div className="flex items-center text-xs font-medium group-hover:text-blue-600 transition-colors duration-300" style={{ color: feature.color }}>
                      <span>Explore</span>
                      <FaArrowRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -bottom-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>

                {/* Floating Elements */}
                {isHovered && (
                  <>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: feature.color }}></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full animate-pulse delay-300" style={{ backgroundColor: feature.color, opacity: 0.6 }}></div>
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 flex items-center justify-center flex-wrap gap-8 transition-all duration-700 delay-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-2 text-gray-600">
            <MdVerified className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Trusted by 50K+ Students</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <HiSparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">4.9/5 Average Rating</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BsShieldCheck className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Secure & Reliable</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logos
