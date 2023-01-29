import axios from "axios";
import BoardCdo from "../model/board/sdo/BoardCdo";

class BoardApi {

    private static _instance: BoardApi;

    static get instance() {
        if (!BoardApi._instance) {
            BoardApi._instance = new BoardApi();
        }
        return BoardApi._instance;
    }

    async findBoardList() {
        return await axios.post('/api/board/find-board-list')
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
    }

    async newBoard(boardCdo: BoardCdo) {
        return await axios.post("/api/board/new-board", {boardCdo})
            .then((res) => {
                return res.data
            })
            .catch((err) => console.log(err))
    }

    async findBoardByBoardNo(boardNo: string) {
        return await axios.post('/api/board/find-board', {boardNo: boardNo})
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
    }

    async findDetailBoard(id: string) {
        return await axios.post('/api/board/find-detail-board', {id: id})
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
    }

    async deleteBoard(id: string) {
        await axios.post("/api/board/delete-board", {id: id})
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
    }
}

export default BoardApi;