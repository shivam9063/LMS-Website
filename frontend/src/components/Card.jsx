import React, { useState } from "react";
import { FaStar, FaPlay, FaUsers, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ thumbnail, title, category, price, id, reviews }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);
  const reviewCount = reviews?.length || 0;

  const handleCardClick = () => {
    navigate(`/viewcourse/${id}`);
  };
  return (
    <div 
      className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Play Button Overlay */}
        <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FaPlay className="text-blue-600 w-4 h-4 ml-0.5" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(avgRating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {avgRating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FaUsers className="w-3 h-3" />
            <span>{reviewCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            <span>6-8 hours</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="text-sm text-gray-400 line-through">₹{Math.floor(price * 1.5)}</span>
          </div>
          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
