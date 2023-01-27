import ERole from "../vo/ERole";

class UserCdo {

    id: string;

    userName: string;
    email: string;
    roles: ERole;
    password: string;


    constructor(id: string, userName: string, email: string, roles: ERole, password: string) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.roles = roles;
        this.password = password;
    }

    static new(): UserCdo {
        return new UserCdo('', '', '', ERole.ADMIN, '');
    }
}

export default UserCdo;