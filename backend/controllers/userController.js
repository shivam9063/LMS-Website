import User from "../models/userModel.js";

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")
         if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}

export const UpdateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {name, description} = req.body
        
        console.log("Update profile request:", {name, description})
        
        // Find the current user
        const user = await User.findById(userId).select("-password").populate("enrolledCourses")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        // Update basic fields only (no photo)
        if(name) user.name = name
        if(description !== undefined) user.description = description

        // Save the updated user
        await user.save()
        
        // Return the fresh updated user with populated fields
        const updatedUser = await User.findById(userId).select("-password").populate("enrolledCourses")
        console.log("Profile updated successfully:", updatedUser.name)
        
        return res.status(200).json(updatedUser)
    } catch (error) {
         console.log("Update Profile Error:", error);
       return res.status(500).json({message:`Update Profile Error: ${error.message}`})
    }
}
