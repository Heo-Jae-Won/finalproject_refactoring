import { instance } from "./axios.util"

export const getPboardRead = (pcode) => {
    return instance({
        url: `/pboard/${pcode}`,
        method: 'get'
    })
}

export const extractPboardRead=(pcode)=>{
    return instance({
        url:'/pboard/data/'+pcode,
        method:'get'
    })
}

export const onPboardUpdate = (formData) => {
    return instance({
        url: '/pboard/update',
        method: 'post',
        data: formData
    })
}

export const onPboardDelete = (pcode) => {
    return instance({
        url: '/pboard/' + pcode,
        method: 'delete',
    })
}

export const getPboardList = (page, num, searchType, keyword) => {
    return instance({
        url: '/pboard',
        method: 'get',
        params: {
            page,
            num,
            searchType,
            keyword
        }
    })
}

export const getPboardLikeUser = (pcode, unickname) => {
    return instance({
        url: `/pboard/like/${pcode}/${unickname}`,
        mehtod: 'get',
    })
}

export const onLikeClicked = (Object) => {
    return instance({
        url: '/pboard/user/like',
        method: 'patch',
        data: Object
    })
}

export const onDislikeClicked = (Object) => {
    return instance({
        url: '/pboard/user/like',
        method: 'patch',
        data: Object
    })
}

export const onPboardInsert = (formData) => {
    return instance({
        url: '/pboard',
        method: 'post',
        data: formData
    })
}

