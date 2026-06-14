import React, { useEffect, useState, useRef } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { FaArrowRight, FaTrophy, FaFire } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import { HiSparkles, HiAcademicCap } from "react-icons/hi";
import { BsLightningFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isInView, setIsInView] = useState(false);
  
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stagger card animations
          popularCourses.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [popularCourses]);

  useEffect(() => {
    let filteredCourses = courseData.slice(0, 6);
    setPopularCourses(filteredCourses);
    setVisibleCards([]); // Reset animations
  }, [courseData]);

  return (
    <div ref={sectionRef} className='relative w-full py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm font-semibold mb-6">
            <FaFire className="w-4 h-4" />
            Most Popular Courses
          </div>

          {/* Main Heading */}
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight'>
            Our 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Popular </span>
            Courses
          </h1>
          
          {/* Description */}
          <p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8'>
            Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond. Join thousands of successful learners.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mb-10">
            <div className="flex items-center gap-2">
              <HiAcademicCap className="w-5 h-5 text-blue-500" />
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTrophy className="w-4 h-4 text-yellow-500" />
              <span>Industry Recognized</span>
            </div>
            <div className="flex items-center gap-2">
              <MdTrendingUp className="w-5 h-5 text-green-500" />
              <span>High Completion Rate</span>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid gap-8 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {popularCourses.map((item, index) => {
            const isVisible = visibleCards.includes(index);
            return (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-8 opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card 
                  id={item._id} 
                  thumbnail={item.thumbnail} 
                  title={item.title} 
                  price={item.price} 
                  category={item.category} 
                  reviews={item.reviews}
                />
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {popularCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiAcademicCap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
            <p className="text-gray-600">Loading courses...</p>
          </div>
        )}

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="absolute inset-0 opacity-30 bg-repeat" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"}}></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Learning?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Discover all our courses and find the perfect path for your career growth
              </p>
              
              <button 
                className='group inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl'
                onClick={() => navigate("/allcourses")}
              >
                <span>Explore All Courses</span>
                <FaArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
              </button>
              
              {/* Floating Elements */}
              <HiSparkles className="absolute top-4 right-4 w-6 h-6 text-yellow-300 animate-pulse" />
              <BsLightningFill className="absolute bottom-4 left-4 w-5 h-5 text-yellow-300 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cardspage
