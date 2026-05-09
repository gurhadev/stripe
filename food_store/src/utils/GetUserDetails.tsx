import AxiosIntance from "./AxiosInstance";

type UserType = {
    id : number,
    name : string,
    email : string,
    created_at : string
}
 
 const getUserDetails = async () : Promise<UserType | undefined> => {
    try {
      const response = await AxiosIntance.get(`/user`);
      const data : UserType = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

export default getUserDetails ;