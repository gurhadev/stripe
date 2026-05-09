import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import Cookies from "js-cookie";
type User = { id: number, name: string, email: string, created_at: string }

interface authType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<authType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({ id: 0, email: "", name: '', created_at: "" });

    useEffect(() => {
        const authUser = Cookies.get("user");
        if (authUser) {
            setUser(JSON.parse(authUser));
        }

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext must be used within AuthProvider");
    return context;
}

