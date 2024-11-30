import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"

import { setSuggestedUsers } from "@/redux/authSlice"

const useGetSuggestedUsers=()=>{
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchSuggestedUsers = async()=>{
            try {
                const res = await axios.get('https://instagram-clone-awa2.onrender.com/api/v1/user/suggested',{withCredentials:true})
                if(res.data.success){
                    console.log(res,"response")
                    
                    dispatch(setSuggestedUsers(res?.data.users))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuggestedUsers()
    },[])
}

export default useGetSuggestedUsers