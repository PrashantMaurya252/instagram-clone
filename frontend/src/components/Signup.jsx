import {  useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"


const Signup = () => {
    const [input,setInput] = useState({
        username:"",
        email:"",
        password:""
    })

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    

    const signupHandler =async(e)=>{
        e.preventDefault()

        try {
            console.log(input)
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className="flex items-center w-screen h-screen justify-center">
        <form onSubmit={signupHandler} className="shadow-lg flex flex-col gap-5 p-8">
            <div className="my-4">
                <h1 className="text-center font-bold text-xl">LOGO</h1>
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
            <Button type='submit'>Signup</Button>
        </form>
    </div>
  )
}

export default Signup