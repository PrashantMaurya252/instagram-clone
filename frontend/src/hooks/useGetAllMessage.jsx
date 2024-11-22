import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

import { setMessages } from "@/redux/chatSlice"

const useGetAllMessages=()=>{
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(store=>store.auth)
    useEffect(()=>{
        const fetchAllMessage = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/message/all/${selectedUser?._id}`,{withCredentials:true})
                if(res.data.success){
                    
                    dispatch(setMessages(res.data.message))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllMessage()
    },[])
}

export default useGetAllMessages