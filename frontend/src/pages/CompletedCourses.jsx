import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCertificate, FaCalendar, FaDownload, FaEye, FaArrowLeft } from 'react-icons/fa';
import Certificate from '../components/Certificate';
import axios from 'axios';
import { serverUrl } from '../App';

function CompletedCourses() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCompletedCourses();
  }, []);

  const fetchCompletedCourses = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/completion/completed-courses`, {
        withCredentials: true
      });
      
      if (response.data.success) {
        setCompletedCourses(response.data.completedCourses);
      }
    } catch (error) {
      console.error('Error fetching completed courses:', error);
    }
    setLoading(false);
  };

  const handleViewCertificate = (course) => {
    setSelectedCourse(course.courseId);
    setShowCertificate(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading completed courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="text-lg" />
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-full">
              <FaCertificate className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Certificates</h1>
              <p className="text-gray-600">View and download your course completion certificates</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-700">{completedCourses.length}</h3>
              <p className="text-blue-600">Courses Completed</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="text-2xl font-bold text-green-700">
                {completedCourses.filter(course => course.certificateGenerated).length}
              </h3>
              <p className="text-green-600">Certificates Generated</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-700">
                {userData?.enrolledCourses?.length || 0}
              </h3>
              <p className="text-purple-600">Total Enrolled</p>
            </div>
          </div>
        </div>

        {/* Completed Courses */}
        {completedCourses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <FaCertificate className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Completed Courses Yet</h3>
            <p className="text-gray-500 mb-6">Complete a course to earn your first certificate!</p>
            <button
              onClick={() => navigate('/allcourses')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((completion, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Course Image */}
                <div className="relative">
                  <img
                    src={completion.courseId?.thumbnail || '/api/placeholder/400/200'}
                    alt={completion.courseId?.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FaCertificate className="text-xs" />
                      Completed
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {completion.courseId?.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <FaCalendar className="text-blue-500" />
                    Completed on {formatDate(completion.completedAt)}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {completion.courseId?.category}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {completion.courseId?.level}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      {completion.completedLectures?.length} Lectures
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewCertificate(completion)}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <FaCertificate className="text-sm" />
                      View Certificate
                    </button>
                    
                    <button
                      onClick={() => navigate(`/viewlecture/${completion.courseId._id}`)}
                      className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors"
                      title="View Course"
                    >
                      <FaEye className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && selectedCourse && (
          <Certificate
            courseData={selectedCourse}
            isVisible={showCertificate}
            onClose={() => {
              setShowCertificate(false);
              setSelectedCourse(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CompletedCourses;