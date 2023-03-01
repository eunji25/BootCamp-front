import {makeAutoObservable, runInAction} from "mobx";
import NoticeApi from "../api/NoticeApi";
import Notice from "../model/notice/Notice";
import NoticeCdo from "../model/notice/sdo/NoticeCdo";

class NoticeStore {

    private static _instance: NoticeStore;

    private readonly noticeApi: NoticeApi;
    detailNotice: Notice | null | undefined;
    noticeList: Notice[] = [];

    static get instance() {
        if (!NoticeStore._instance) {
            NoticeStore._instance = new NoticeStore();
        }
        return NoticeStore._instance;
    }

    constructor(noticeApi: NoticeApi = NoticeApi.instance,) {
        this.noticeApi = noticeApi;
        makeAutoObservable(this, {}, {autoBind: true});
    }

    async findNoticeList(): Promise<Notice[]> {
        const noticeList: Notice[] = await this.noticeApi.findNoticeList();
        runInAction(() => this.noticeList = Object.assign(noticeList));
        return noticeList;
    }

    async newNotice(noticeCdo: NoticeCdo): Promise<Notice> {
        return await this.noticeApi.newNotice(noticeCdo);
    }

    async findDetailNotice(id: string): Promise<Notice> {
        const detailNotice: Notice = await this.noticeApi.findDetailNotice(id);
        runInAction(() => this.detailNotice = detailNotice);
        return detailNotice;
    }

    async deleteNotice(id: string): Promise<void> {
        await this.noticeApi.deleteNotice(id);
    }

    async modifyNotice(noticeCdo: NoticeCdo) {
        await this.noticeApi.modifyNotice(noticeCdo);
    }
}

export default NoticeStore;
