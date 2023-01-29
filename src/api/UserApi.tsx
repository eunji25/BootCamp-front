import UserCdo from "../model/user/sdo/UserCdo";
import axios from "axios";
import ERole from "../model/user/vo/ERole";

class UserApi {

    private static _instance: UserApi;

    static get instance() {
        if (!UserApi._instance) {
            UserApi._instance = new UserApi();
        }
        return UserApi._instance;
    }

    async newUser(userCdo: UserCdo) {
        return await axios.post("/api/auth/signup", {
            userName: userCdo.userName,
            email: userCdo.email,
            roles: userCdo.roles,
            password: userCdo.password,
        })
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
    }

    async login(email: string, password: string) {
        return await axios.post("/api/auth/login", {email, password}
        )
            .then((res) => {
                // if (res.ACCESS_TOKEN) {
                //     localStorage.setItem('login-token', res.ACCESS_TOKEN);
                // }
                return res.data;
            })
            .catch(err => console.log(err))
    }
}

export default UserApi;