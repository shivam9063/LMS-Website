import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"
const getCurrentUser = ()=>{
    let dispatch = useDispatch()
    let { userData } = useSelector(state => state.user)
   
    useEffect(()=>{
        // Only fetch user data if it hasn't been loaded yet
        // This prevents unnecessary API calls when user is logged out
        if (userData === null) {
            // User is explicitly logged out, don't make API call
            return;
        }
        
        // Only make API call on initial load (userData is undefined)
        if (userData === undefined) {
            const fetchUser = async () => {
                try {
                    let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                    dispatch(setUserData(result.data))

                } catch (error) {
                    console.log(error)
                    // User is not authenticated, set to null to prevent future calls
                    dispatch(setUserData(null))
                }
            }
            fetchUser()
        }
    },[userData]) // Add userData as dependency
}

export default getCurrentUser