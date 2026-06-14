
import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
      console.log("Authentication check - Cookies received:", Object.keys(req.cookies));
      let {token} = req.cookies
      
      if(!token){
        console.log("No token found in cookies");
        return res.status(401).json({message:"Authentication required. Please login first.", requiresLogin: true})
      }
      
      console.log("Token found, verifying...");
      let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
      
      if(!verifyToken){
        console.log("Token verification failed");
        return res.status(401).json({message:"Invalid or expired token. Please login again.", requiresLogin: true})
      }
  
      console.log("Token verified successfully for user:", verifyToken.userId);
      req.userId = verifyToken.userId
      next()
    } catch (error) {
        console.log("Authentication error:", error.message)
        if (error.name === 'TokenExpiredError') {
          return res.status(401).json({message:"Token has expired. Please login again.", requiresLogin: true})
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(401).json({message:"Invalid token. Please login again.", requiresLogin: true})
        }
        return res.status(500).json({message:`Authentication error: ${error.message}`})
    }
}
export default isAuth