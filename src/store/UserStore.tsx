import {makeAutoObservable, runInAction} from "mobx";
import UserApi from "../api/UserApi";
import UserCdo from "../model/user/sdo/UserCdo";
import User from "../model/user/User";

class UserStore {

    private static _instance: UserStore;

    private readonly userApi: UserApi;

    userData: User | null = null;

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

    async login(email: string, password: string): Promise<User> {
        const userData: User = await this.userApi.login(email, password);
        runInAction(() => this.userData = userData);
        return userData;
    }

}

export default UserStore;