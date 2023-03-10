
class BoardCdo {

    id: string;

    registerTime: string;
    modificationTime: string;

    boardNo: number;
    title: string;
    content: string;
    image: string;

    email: string;
    userName: string;
    // auth: Auth | null = null;

    constructor(id: string, registerTime: string, modificationTime: string, boardNo: number, title: string, content: string, email: string, image: string, userName: string) {
        this.id = id;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
        this.boardNo = boardNo;
        this.title = title;
        this.content = content;
        this.image = image;
        this.email = email;
        this.userName = userName;
    }

    static new(): BoardCdo {
        return new BoardCdo('', '', '', 1,'', '', '', '', '');
    }
}

export default BoardCdo;
