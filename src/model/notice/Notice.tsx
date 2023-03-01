import React from "react";

class Notice {

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

    static fromDomain(domain: Notice): Notice {
        const notice = new Notice(
            domain.id,
            domain.registerTime,
            domain.modificationTime,
            domain.noticeNo,
            domain.title,
            domain.content,
            domain.email,
            domain.userName,
        )
        // board.auth = Auth.member;
        return notice;
    }

    static new(): Notice {
        return new Notice( '', '', '', 1, '', '', '', '');
    }

}
export default Notice;
