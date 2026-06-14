import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from "../controllers/courseController.js"
import upload from "../middlewares/multer.js"

let courseRouter = express.Router()

courseRouter.post("/create", isAuth, createCourse)
courseRouter.get("/getpublishedcoures", getPublishedCourses)
courseRouter.get("/getcreatorcourses", isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId", isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId", isAuth, getCourseById)
courseRouter.delete("/removecourse/:courseId", isAuth, removeCourse)
courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/getcourselecture/:courseId", isAuth, getCourseLecture)
courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)
courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
courseRouter.post("/getcreator", isAuth, getCreatorById)
courseRouter.post("/publishalldrafts", isAuth, async (req, res) => {
    try {
        const userId = req.userId;
        const result = await (await import("../models/courseModel.js")).default.updateMany({ creator: userId, isPublished: false }, { $set: { isPublished: true } });
        // mongoose 6 returns an object with modifiedCount
        const modified = result.modifiedCount ?? result.nModified ?? 0;
        return res.status(200).json({ message: `Published ${modified} courses`, modifiedCount: modified });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to publish drafts" });
    }
})







export default courseRouter