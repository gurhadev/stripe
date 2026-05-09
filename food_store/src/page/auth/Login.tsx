import { useEffect, useState } from "react"
import AxiosIntance from "../../utils/AxiosInstance";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginUserType = {
    email: string,
    password: string
}

type UserType = {
    id: number,
    name: string,
    email: string,
}

type DataType = {
    token: string,
    expires_in: number
    user: UserType
}

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState()
    const navigate = useNavigate();
    const loginUser: LoginUserType = { email, password }

    async function handleLogin(e: React.SubmitEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        try {
            setLoading(true)
            const response = await AxiosIntance.post("/login", loginUser);
            const data: DataType = await response?.data;

            Cookies.set("token", data.token);
            Cookies.set("user", JSON.stringify(data.user));
            setLoading(false);
            toast("User logged in Successfully",{type : "success"})
            navigate("/");
        } catch (error: any) {
            setLoading(false);
            setError(error?.response?.data?.error)
        }
    }
    const token = Cookies.get("token");
    useEffect(()=>{
        if(token) { navigate("/")}  
    },[token])

    return (
        <div className="flex items-center justify-center h-screen flex-col gap-2">
            <form onSubmit={(e) => handleLogin(e)} className="w-100 p-3 pb-5 bg-indigo-100 rounded-xl shadow-2xl flex flex-col gap-4">
                <h1 className="text-center text-2xl">Login Form</h1>
                <div className="flex flex-col">
                    <label className="px-1">Email</label>
                    <input name="email" onChange={(e) => setEmail(e.target.value)} className="w-full bg-white outline-none px-2 py-3 rounded-md shadow focus:shadow-blue-600" type="text" placeholder="Email" />
                    <p className="text-rose-600 px-2"></p>
                </div>
                <div className="flex flex-col">
                    <label className="px-1">Password</label>
                    <input name="password" onChange={(e) => setPassword(e.target.value)} className="w-full bg-white px-2  outline-none py-3 rounded-md shadow focus:shadow-blue-600" type="password" placeholder="Password" />
                    <p className="text-rose-600 px-2"></p>
                </div>
                <div className="flex flex-col">
                    <button type="submit" className="w-full p-3 rounded shadow bg-blue-600 transition-all duration-300 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50" disabled={loading} >{loading ? "Loading..." : "Log In"}</button>
                    {error && <p className="text-rose-600 px-2">{error}</p>}
                </div>


            </form>
        </div>
    )
}

export default Login