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
                const res = await axios.get(`https://instagram-clone-awa2.onrender.com/api/v1/message/all/${selectedUser?._id}`,{withCredentials:true})
                if(res.data.success){
                    
                    dispatch(setMessages(res.data.messages))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllMessage()
    },[selectedUser])
}

export default useGetAllMessages