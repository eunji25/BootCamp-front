import axios from "axios";
import NoticeCdo from "../model/notice/sdo/NoticeCdo";

class NoticeApi {
    private static _instance: NoticeApi;

    static get instance() {
        if (!NoticeApi._instance) {
            NoticeApi._instance = new NoticeApi();
        }
        return NoticeApi._instance;
    }

    async findNoticeList() {
        return await axios.post('/api/notice/find-notice-list')
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err))
    }

    async newNotice(noticeCdo: NoticeCdo) {
        return await axios.post("/api/notice/new-notice", {noticeCdo})
            .then((res) => {
                return res.data
            })
            .catch((err) => console.log(err))
    }

    async findDetailNotice(id: string) {
        return await axios.post('/api/notice/find-detail-notice', {id: id})
            .then(res => {
                return res.data
            })
            .catch(err => console.log(err));
    }

    async deleteNotice(id: string) {
        await axios.post("/api/notice/delete-notice", {id: id})
            .then(res => {
                return res.data;
            })
            .catch(err => console.log(err));
    }

    async modifyNotice(noticeCdo: NoticeCdo) {
        await axios.post("/api/notice/modify-notice", {noticeCdo})
            .then((res) => {
                return res.data
            })
            .catch((err) => console.log(err))
    }
}

export default NoticeApi;