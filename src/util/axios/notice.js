import { instance } from "./axios.util"

export const getNoticeRead = (ncode) => {
    return instance({
        url: `/notice/${ncode}`,
        method: 'get'
    })
}

export const getNoticeList = (page, num, searchType, query) => {
    return instance({
        url: '/notice',
        method: 'get',
        params: {
            page,
            num,
            searchType,
            query
        }
    })
}