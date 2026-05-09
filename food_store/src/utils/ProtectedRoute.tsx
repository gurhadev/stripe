import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const natigate = useNavigate()
    const token = Cookies.get("token");

    useEffect(()=>{
        if (!token) {
        natigate("/login");
    } else{
        natigate("/");
    }
    },[token])

    return children ;
}

export default ProtectedRoute