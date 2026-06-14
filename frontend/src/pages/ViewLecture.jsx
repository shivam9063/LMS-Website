import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle, FaCertificate, FaCheckCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import Certificate from '../components/Certificate';
import axios from 'axios';
import { serverUrl } from '../App';

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  
  // ViewLecture working properly

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const [watchedLectures, setWatchedLectures] = useState(new Set());
  const [showCertificate, setShowCertificate] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate()
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;

  // Check if course is already completed on component mount
  useEffect(() => {
    checkCourseCompletion();
  }, [courseId]);

  // Check course completion status
  const checkCourseCompletion = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/completion/check/${courseId}`, {
        withCredentials: true
      });

      if (response.data.success) {
        setCourseCompleted(response.data.isCompleted);
      }
    } catch (error) {
      console.error('Error checking course completion:', error);
    }
  };

  // Handle video end event to mark lecture as watched
  const handleVideoEnd = (lecture) => {
    setWatchedLectures(prev => new Set([...prev, lecture._id]));
  };

  // Check if all lectures are watched to show completion button
  const allLecturesWatched = selectedCourse?.lectures?.every(lecture =>
    watchedLectures.has(lecture._id)
  );

  // Complete the course
  const completeCourse = async () => {
    if (!allLecturesWatched && !courseCompleted) {
      alert('Please watch all lectures to complete the course');
      return;
    }

    setIsCompleting(true);
    try {
      const response = await axios.post(`${serverUrl}/api/completion/complete`, {
        courseId: courseId
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setCourseCompleted(true);
        setShowCertificate(true);
      } else {
        alert(response.data.message || 'Error completing course');
      }
    } catch (error) {
      console.error('Error completing course:', error);
      alert(error.response?.data?.message || 'Error completing course. Please try again.');
    }
    setIsCompleting(false);
  };

  // Generate certificate
  const generateCertificate = async () => {
    try {
      await axios.post(`${serverUrl}/api/completion/certificate-generated`, {
        courseId: courseId
      }, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error marking certificate generated:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">

      {/* Left - Video & Course Info */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        {/* Course Details */}
        <div className="mb-6" >

          <h1 className="text-2xl font-bold flex items-center justify-start gap-[20px]  text-gray-800"><FaArrowLeftLong className=' text-black w-[22px] h-[22px] cursor-pointer' onClick={() => navigate("/")} />{selectedCourse?.title}</h1>

          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
          {selectedLecture?.videoUrl ? (
            <video
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              onEnded={() => handleVideoEnd(selectedLecture)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        {/* Course Completion Section */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Course Progress
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Watched: {watchedLectures.size} / {selectedCourse?.lectures?.length || 0} lectures
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${selectedCourse?.lectures?.length ?
                      (watchedLectures.size / selectedCourse.lectures.length) * 100 : 0}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {courseCompleted ? (
                <>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <FaCheckCircle className="text-xl" />
                    Course Completed!
                  </div>
                  <button
                    onClick={() => {
                      setShowCertificate(true);
                      generateCertificate();
                    }}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <FaCertificate />
                    Get Certificate
                  </button>
                </>
              ) : (
                <button
                  onClick={completeCourse}
                  disabled={!allLecturesWatched || isCompleting}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer ${allLecturesWatched && !isCompleting
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <FaCheckCircle />
                  {isCompleting ? 'Completing...' : 'Complete Course'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selected Lecture Info */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">{selectedLecture?.lectureTitle}</h2>

        </div>
      </div>

      {/* Right - All Lectures + Creator Info */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                onClick={() => setSelectedLecture(lecture)}
                className={`flex items-center justify-between p-3 rounded-lg border transition text-left cursor-pointer ${selectedLecture?._id === lecture._id
                    ? 'bg-gray-200 border-gray-500'
                    : 'hover:bg-gray-50 border-gray-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  {watchedLectures.has(lecture._id) && (
                    <FaCheckCircle className="text-green-500 text-sm" />
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h4>
                  </div>
                </div>
                <FaPlayCircle className="text-black text-xl" />
              </button>
            ))
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold text-gray-700 mb-3">Instructor</h3>
            <div className="flex items-center gap-4">
              <img
                src={courseCreator.photoUrl || '/default-avatar.png'}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-base font-medium text-gray-800">{courseCreator.name}</h4>
                <p className="text-sm text-gray-600">
                  {courseCreator.description || 'No bio available.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <Certificate
          userData={userData}
          course={selectedCourse || courseData?.[0]}
          isVisible={showCertificate}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

export default ViewLecture;
