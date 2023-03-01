
class BoardCdo {

    id: string;
    registerTime: string;
    modificationTime: string;

    noticeNo: number;
    title: string;
    content: string;

    email: string;
    userName: string;

    constructor(id: string, registerTime: string, modificationTime: string, noticeNo: number, title: string, content: string, email: string, userName: string) {
        this.id = id;
        this.registerTime = registerTime;
        this.modificationTime = modificationTime;
        this.noticeNo = noticeNo;
        this.title = title;
        this.content = content;
        this.email = email;
        this.userName = userName;
    }

    static new(): BoardCdo {
        return new BoardCdo('', '', '',1, '', '', '', '');
    }
}

export default BoardCdo;
