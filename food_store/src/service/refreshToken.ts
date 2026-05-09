import AxiosIntance from "../utils/AxiosInstance";

type Data = {
    token : string ;
    status : boolean;
    expires_in : number
}

const refreshToken = async () : Promise<string | undefined > => {
    try {
        const response = await AxiosIntance.post("/refresh",{},{withCredentials : true});
        const data : Data = response.data ;
        return data.token ;
    } catch (error :any ) {
        return
    }
} 

export default refreshToken ;