import { instance } from "./axios.util"

export const getEventRead = (ecode) => {
    return instance({
        url: `/event/${ecode}`,
        method: 'get'
    })
}

export const getEventList = (page, num, searchType, query) => {
    return instance({
        url: `/event/list`,
        method: 'get',
        params: {
            page,
            num,
            searchType,
            query
        }
    })
}

export const getReplyList = (ecode, page, num) => {
    return instance({
        url: `/ereply/list`,
        method: 'get',
        params: {
            ecode,
            page,
            num
        }
    })
}

export const insertReply = (data) => {
    return instance({
        url: `/ereply`,
        method: 'post',
        data,
    })
}

export const deleteReply = (ercode) => {
    return instance({
        url: `/ereply/${ercode}`,
        method: 'patch'
    })
}