import React from "react";

class Board {

    id: string;

    registerTime: string;
    modificationTime: string;

    boardNo: string;
    title: string;
    content: string;
    image: string;

    email: string;
    userName: string;

    constructor(id: string, registerTime: string, modificationTime: string, boardNo: string, title: string, content: string, image: string, email: string, userName: string) {
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

    static fromDomain(domain: Board): Board {
        const board = new Board(
            domain.id,
            domain.registerTime,
            domain.modificationTime,
            domain.boardNo,
            domain.title,
            domain.content,
            domain.image,
            domain.email,
            domain.userName,
        )
        // board.auth = Auth.member;
        return board;
    }

    static new(): Board {
        return new Board( '', '', '', '', '', '', '', '', '');
    }

}

export default Board;