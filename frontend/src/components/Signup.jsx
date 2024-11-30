import {  useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import axios from "axios"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useSelector } from "react-redux"


const Signup = () => {
    const [input,setInput] = useState({
        username:"",
        email:"",
        password:""
    })

    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {user} = useSelector(store=>store.auth)

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    

    const signupHandler =async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)
            const res = await axios.post('https://instagram-clone-awa2.onrender.com/api/v1/user/register',input,{
                headers:{
                    "Content-Type":'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message);
                setInput({
                    username:"",
                    email:"",
                    password:""
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])
  return (
    <div className="flex items-center w-screen h-screen justify-center">
        <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
            <div className="my-4">
            <div className="my-8 pl-3  flex justify-center items-center">
            <img
              src="https://i.pinimg.com/236x/e3/e6/d1/e3e6d1c4355a6213f8e7ec88d5ced07b.jpg"
              alt="logo"
              className="w-[50px] h-[50px] object-cover rounded-xl"
            />
          </div>
                <p className="text-sm text-center">Signup to see photos & videos from your friends</p>
            </div>
            <div>
                <Label>Username</Label>
                <Input type="text" name="username" value={input.username} onChange={changeEventHandler} className="focus-visible:ring-transparent my-2"/>
            </div>

            <div>
                <Label>Email</Label>
                <Input type="text" name="email" value={input.email} onChange={changeEventHandler} className="focus-visible:ring-transparent my-2"/>
            </div>

            <div>
                <Label>Password</Label>
                <Input type="password" name="password" value={input.password} onChange={changeEventHandler} className="focus-visible:ring-transparent my-2"/>
            </div>
            {
                loading ? (
                    <Button>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                        Please wait
                    </Button>
                ):(
                    <Button type='submit'>Signup</Button>
                )
            }
            
            <span className="text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
        </form>
    </div>
  )
}

export default Signup