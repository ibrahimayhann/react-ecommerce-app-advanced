import type { UserType } from "../types/Types";
import axios from "../config/AxiosConfig";

class LoginPageService {

    async login(): Promise<UserType[]> {
        const response = await axios.get<UserType[]>("/users");
        return response.data

    }
}
export default new LoginPageService();  