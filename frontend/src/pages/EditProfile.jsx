import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function EditProfile() {
     const {userData} = useSelector(state=>state.user)
     const [name,setName] = useState(userData.name || "")
     const [description,setDescription] = useState(userData.description || "")
     const dispatch = useDispatch()
     const [loading,setLoading] = useState(false)
     const navigate = useNavigate()



     const updateProfile = async (e) => {
      e.preventDefault()
      
      if (!name.trim()) {
          toast.error("Name is required")
          return
      }

      setLoading(true)
      try {
        const updateData = {
            name: name.trim(),
            description: description.trim()
        }

        console.log("Sending data:", updateData)

        const result = await axios.post(serverUrl + "/api/user/updateprofile", updateData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        console.log("Profile update response:", result.data)
        
        // Update Redux store with fresh data
        dispatch(setUserData(result.data))
        
        toast.success("Profile updated successfully!")
        
        // Navigate back to profile
        setTimeout(() => {
            navigate("/profile")
        }, 1000)
        
      } catch (error) {
        console.error("Profile update error:", error)
        console.error("Error response:", error.response?.data)
        toast.error(error.response?.data?.message || "Profile update failed")
      } finally {
        setLoading(false)
      }
     }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <FaArrowLeftLong  className='absolute top-[5%] left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/profile")}/>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>

        <form className="space-y-5" onSubmit={updateProfile}>
          {/* Profile Avatar Display Only */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] border-2 bg-black border-white'>
              {userData?.name?.slice(0,1).toUpperCase()}
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Profile Avatar
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black] placeholder:text-black"
              placeholder={userData.name}
              onChange={(e)=>setName(e.target.value)}
              value={name}
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              
              readOnly
              className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600 placeholder:text-black"
              placeholder={userData.email}
            />
          </div>

         

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
             
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-[black]"
              rows={3}
              placeholder="Tell us about yourself"
              onChange={(e)=>setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 rounded-md font-medium transition cursor-pointer disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color='white'/> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
