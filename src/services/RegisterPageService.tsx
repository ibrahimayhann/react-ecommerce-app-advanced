import axios from "../config/AxiosConfig";//kendi yazdığım axiosInstance ı axios ismiyle import ettim 
import type { UserType } from "../types/Types";

class RegisterPageService {

    /* register(newUser:UserType){
        return new Promise((resolve:any,reject:any)=>{
            axios.post("/users",newUser)
            .then((response:AxiosResponse<any,any>)=>resolve(response.data))
            .catch((error:any)=>reject(error));
        })
    } */


    async register(newUser: any/*: UserType*/) {
        const response = await axios.post("/users", newUser);
        return response.data;
        //Error bubbles up mantığıyla ui da try catch ile hatayı yakala 
    }
}

export default new RegisterPageService();