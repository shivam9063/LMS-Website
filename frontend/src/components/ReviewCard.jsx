import React, { useState } from "react";
import { FaStar, FaQuoteLeft, FaThumbsUp, FaHeart, FaUser } from "react-icons/fa";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { MdVerified, MdThumbUp } from "react-icons/md";
const ReviewCard = ({ text, name, image, rating, role }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 20) + 5);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'from-green-500 to-emerald-500';
    if (rating >= 4) return 'from-blue-500 to-cyan-500';
    if (rating >= 3) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-200/50 overflow-hidden max-w-sm w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Top Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      
      {/* Quote Icon */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <FaQuoteLeft className={`w-8 h-8 text-purple-400 transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`} />
          
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600'
            }`}
          >
            <FaHeart className={`w-3 h-3 transition-transform duration-300 ${isLiked ? 'scale-110' : ''}`} />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <BsStarFill
                  key={i}
                  className={`w-5 h-5 transition-all duration-300 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 group-hover:scale-110' 
                      : 'text-gray-300'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-700 ml-2">{rating.toFixed(1)}</span>
          </div>
          
          {/* Rating Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getRatingColor(rating)} shadow-lg`}>
            {rating >= 4.5 ? 'Excellent' : rating >= 4 ? 'Great' : rating >= 3 ? 'Good' : 'Fair'}
          </div>
        </div>

        {/* Review Text */}
        <div className="relative mb-8">
          <p className="text-gray-700 leading-relaxed text-base font-medium line-clamp-4">
            "{text}"
          </p>
          
          {/* Text Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
        </div>

        {/* Reviewer Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={image || '/default-avatar.png'}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-3 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=56`;
                }}
              />
              
              {/* Verified Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <MdVerified className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 text-lg group-hover:text-purple-600 transition-colors duration-300">
                {name}
              </h4>
              <p className="text-sm text-gray-500 font-medium flex items-center gap-1">
                <FaUser className="w-3 h-3" />
                {role}
              </p>
            </div>
          </div>

          {/* Thumbs Up */}
          <button className="group/thumb p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition-all duration-300 transform hover:scale-110">
            <MdThumbUp className="w-5 h-5 text-gray-500 group-hover/thumb:text-blue-600 transition-colors duration-300" />
          </button>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <HiSparkles className="w-6 h-6 text-purple-400 animate-pulse" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ReviewCard;
