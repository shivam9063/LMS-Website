import User from '../models/userModel.js';
import Course from '../models/courseModel.js';
import Lecture from '../models/lectureModel.js';

// Mark course as completed
export const markCourseComplete = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    // Get the course and its lectures
    const course = await Course.findById(courseId).populate('lectures');
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    // Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if user is enrolled in the course
    if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "You are not enrolled in this course"
      });
    }

    // Check if course is already completed
    const existingCompletion = user.completedCourses.find(
      completion => completion.courseId.toString() === courseId
    );

    if (existingCompletion) {
      return res.status(400).json({
        success: false,
        message: "Course already completed"
      });
    }

    // Add to completed courses
    const completionData = {
      courseId: courseId,
      completedAt: new Date(),
      completedLectures: course.lectures.map(lecture => lecture._id),
      certificateGenerated: false
    };

    user.completedCourses.push(completionData);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Course marked as completed successfully",
      completion: completionData
    });

  } catch (error) {
    console.error("Error marking course complete:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Mark certificate as generated
export const markCertificateGenerated = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Find the completed course
    const completedCourse = user.completedCourses.find(
      completion => completion.courseId.toString() === courseId
    );

    if (!completedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course completion not found"
      });
    }

    // Mark certificate as generated
    completedCourse.certificateGenerated = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Certificate marked as generated"
    });

  } catch (error) {
    console.error("Error marking certificate generated:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get user's completed courses
export const getCompletedCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).populate({
      path: 'completedCourses.courseId',
      model: 'Course'
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      completedCourses: user.completedCourses
    });

  } catch (error) {
    console.error("Error getting completed courses:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Check if course is completed
export const checkCourseCompletion = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isCompleted = user.completedCourses.some(
      completion => completion.courseId.toString() === courseId
    );

    res.status(200).json({
      success: true,
      isCompleted,
      completionData: isCompleted 
        ? user.completedCourses.find(completion => completion.courseId.toString() === courseId)
        : null
    });

  } catch (error) {
    console.error("Error checking course completion:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};