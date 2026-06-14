import React, { useEffect, useState, useRef } from 'react'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux';
import { FaStar, FaQuoteLeft, FaUsers, FaThumbsUp, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiSparkles, HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import { MdVerified, MdTrendingUp } from 'react-icons/md';


function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const { allReview } = useSelector(state => state.review);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Stagger card animations
          latestReview.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [latestReview]);
  
  useEffect(() => {
    setLatestReview(allReview.slice(0, 6));
    setVisibleCards([]); // Reset animations when reviews change
  }, [allReview]);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % Math.max(1, latestReview.length - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [latestReview.length]);

  // Calculate average rating
  const averageRating = latestReview.length > 0 
    ? (latestReview.reduce((sum, review) => sum + review.rating, 0) / latestReview.length).toFixed(1)
    : 0;
  return (
    <div ref={sectionRef} className='relative w-full py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-purple-50 overflow-hidden'>
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
            <HiChatBubbleBottomCenterText className="w-4 h-4" />
            Student Reviews
          </div>

          {/* Main Heading */}
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight px-4'>
            Real Reviews from 
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> Real Learners</span>
          </h1>
          
          {/* Description */}
          <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 px-4'>
            Discover how our innovative learning platform is transforming educational experiences through 
            authentic feedback from students and professionals worldwide.
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center mb-8 md:mb-12 px-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 md:gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-4 sm:px-6 md:px-8 py-4 shadow-lg border border-gray-200/50 w-full max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill 
                      key={i} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{averageRating}</span>
                <span className="text-gray-600 text-sm sm:text-base">/ 5.0</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-500 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{latestReview.length}</span>
                <span className="text-gray-600 text-sm sm:text-base">Reviews</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <MdVerified className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-gray-600 text-sm sm:text-base">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
            {latestReview.map((item, index) => {
              const isVisible = visibleCards.includes(index);
              return (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    isVisible 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-8 opacity-0 scale-95'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative">
                    <ReviewCard 
                      rating={item.rating} 
                      image={item.user.photoUrl} 
                      text={item.comment} 
                      name={item.user.name} 
                      role={item.user.role}
                    />
                    
                    {/* Hover Effect Overlay */}
                    {hoveredCard === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 via-transparent to-transparent rounded-3xl pointer-events-none transition-opacity duration-300"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16 px-4 transition-all duration-1000 delay-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: FaThumbsUp, value: '98%', label: 'Satisfaction Rate', color: 'from-green-500 to-emerald-500' },
            { icon: MdTrendingUp, value: '15k+', label: 'Success Stories', color: 'from-blue-500 to-cyan-500' },
            { icon: HiSparkles, value: '4.9', label: 'Average Rating', color: 'from-purple-500 to-pink-500' },
            { icon: FaHeart, value: '92%', label: 'Would Recommend', color: 'from-red-500 to-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="group text-center p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
              <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="text-xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-600/90"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 -translate-x-32"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Join Thousands of Happy Learners</h3>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto text-lg">
                Start your learning journey today and become part of our success story
              </p>
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <span>Start Learning Now</span>
                <HiSparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 

export default ReviewPage
