import ERole from "./vo/ERole";

class User {

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

    static fromDomain(domain: User): User {
        const member = new User(
            domain.id,
            domain.userName,
            domain.email,
            domain.roles,
            domain.password,
        );
        return member;
    }

    static new(): User {
        return new User('', '', '', ERole.ADMIN, '');
    }
}

export default User;