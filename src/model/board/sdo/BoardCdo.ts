
class BoardCdo {

    id: string;

    registerTime: string;
    modificationTime: string;

    boardNo: string;
    title: string;
    content: string;

    email: string;
    userName: string;
    // auth: Auth | null = null;

    constructor(id: string, registerTime: string, modificationTime: string, boardNo: string, title: string, content: string, email: string, userName: string) {
        this.id = id;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
        this.boardNo = boardNo;
        this.title = title;
        this.content = content;
        this.email = email;
        this.userName = userName;
    }

    static new(): BoardCdo {
        return new BoardCdo('', '', '', '','', '', '', '');
    }
}

export default BoardCdo;