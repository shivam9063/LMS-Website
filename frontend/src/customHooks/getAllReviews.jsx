import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setAllReview } from '../redux/reviewSlice'
import axios from 'axios'

const getAllReviews = () => {

   const dispatch = useDispatch()
   const { allReview } = useSelector(state => state.review)
  

  useEffect(()=>{
    // Only fetch reviews if not already loaded
    if (allReview && allReview.length > 0) {
      return; // Already have reviews, don't fetch again
    }
    
    const getAllReviews = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/review/allReview" , {withCredentials:true})
        console.log(result.data)
        dispatch(setAllReview(result.data))
        
      } catch (error) {
        console.log(error)
      }
    }
    getAllReviews()
  },[allReview])
  
}

export default getAllReviews
