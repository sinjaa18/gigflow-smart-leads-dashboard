import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage =()=>{
    const navigate=useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const handleLogin= async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/auth/login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        email,password
                    })
                }
            )
            const data = await response.json()
            console.log(data)
            localStorage.setItem("token",data.token)
            
            navigate("/dashboard")
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
           <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-[350px]">
             <h1 className="text-2xl font-bold mb-6 text-center"> Login  </h1>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />
            <input 
                type="password"
                placeholder="Passwotrd"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full border p-3 rounded mb-4"
            />
            <button className="w-full bg-black text-white p-3 rounded">Login</button>
           </form>
        </div>
    )
}
export default LoginPage