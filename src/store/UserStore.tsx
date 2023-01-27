import {makeAutoObservable, runInAction} from "mobx";
import UserApi from "../api/UserApi";
import UserCdo from "../model/user/sdo/UserCdo";
import User from "../model/user/User";

class UserStore {

    private static _instance: UserStore;

    private readonly userApi: UserApi;

    userList: User[] = [];

    static get instance() {
        if (!UserStore._instance) {
            UserStore._instance = new UserStore();
        }
        return UserStore._instance;
    }

    constructor(
        userApi: UserApi = UserApi.instance,
    ) {
        this.userApi = userApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async newUser(userCdo: UserCdo): Promise<User> {
        return await this.userApi.newUser(userCdo);
    }

    async login(userid: string, password: string) {
        return await this.userApi.login(userid, password);
    }

}

export default UserStore;