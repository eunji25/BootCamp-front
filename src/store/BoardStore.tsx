import BoardApi from "../api/BoardApi";
import {makeAutoObservable, runInAction} from "mobx";
import BoardRdo from "../model/board/sdo/BoardRdo";
import BoardCdo from "../model/board/sdo/BoardCdo";
import Board from "../model/board/Board";

class BoardStore {

    private static _instance: BoardStore;

    private readonly boardApi: BoardApi;

    boardRdo: BoardRdo | null | undefined;
    detailBoard: Board | null | undefined;
    boardList: Board[] = [];

    static get instance() {
        if (!BoardStore._instance) {
            BoardStore._instance = new BoardStore();
        }
        return BoardStore._instance;
    }

    constructor(
        boardApi: BoardApi = BoardApi.instance,
    ) {
        this.boardApi = boardApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async findBoardList(): Promise<Board[]> {
        const boardList: Board[] = await this.boardApi.findBoardList();
        runInAction(() => this.boardList = Object.assign(boardList));
        return boardList;
    }

    async newBoard(boardCdo: BoardCdo): Promise<Board> {
        return await this.boardApi.newBoard(boardCdo);
    }

    async findBoardByBoardNo(boardNo: string): Promise<BoardRdo> {
        const boardRdo: BoardRdo = await this.boardApi.findBoardByBoardNo(boardNo);
        runInAction(() => this.boardRdo = Object.assign(new BoardRdo(boardRdo.boards)));
        return boardRdo;
    }

    async findDetailBoard(id: string): Promise<Board> {
        const detailBoard: Board = await this.boardApi.findDetailBoard(id);
        runInAction(() => this.detailBoard = detailBoard);
        return detailBoard;
    }

    async deleteBoard(id: string): Promise<void> {
        await this.boardApi.deleteBoard(id);
    }

    async modifyBoard(boardCdo: BoardCdo) {
        await this.boardApi.modifyBoard(boardCdo);
    }
}

export default BoardStore;