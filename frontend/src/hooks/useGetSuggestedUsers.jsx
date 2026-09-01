import { useEffect } from "react"
import api from "@/lib/api";
import { useDispatch } from "react-redux"

import { setSuggestedUsers } from "@/redux/authSlice"

const useGetSuggestedUsers=()=>{
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const fetchSuggestedUsers = async()=>{
            try {
                const res = await api.get('/api/v1/user/suggested',{withCredentials:true})
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