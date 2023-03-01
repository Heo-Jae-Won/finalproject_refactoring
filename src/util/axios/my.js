import { instance } from "./axios.util"

export const onPasswordUpdate = (object) => {
    return instance({
        url: '/user/password',
        method: 'patch',
        data: object
    })
}

export const getTradeSellChart = (seller) => {
    return instance({
        url: '/tradeinfo/sellchart/' + seller,
        method: 'get'
    })
}

export const getTradeSellList = (seller, page) => {
    return instance({
        url: '/tradeinfo/selllist/' + seller,
        method: 'get',
        params: {
            page,
        }
    })
}

export const getReceivedReview = (page, unickname) => {
    return instance({
        url: '/review',
        method: 'get',
        params: {
            page,
            num: 6,
            receiver: unickname
        }
    })
}

export const getPaymentId = (paymetnId) => {
    return instance({
        url: '/payment/' + paymetnId,
        method: 'get'
    })
}

export const onPayment = (formData) => {
    return instance({
        url: '/payment',
        method: 'post',
        data: formData
    })
}

export const onReviewInsert = (formData) => {
    return instance({
        url: '/review',
        method: 'post',
        data: formData
    })
}

export const getUserNickname = (unickname) => {
    return instance({
        url: '/user/data/' + unickname,
        method: 'get'
    })
}

export const getUserId = (userId) => {
    return instance({
        url: '/user/' + userId,
        method: 'get'
    })
}

export const onUserInfoUpdate = (data) => {
    return instance({
        url: '/user/update',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getUserCondition = (uid) => {
    return instance({
        url: '/user/condition',
        method: 'put',
        data: uid
    })
}

export const getTradeBuyChart = (buyer) => {
    return instance({
        url: '/tradeinfo/buychart/' + buyer,
        method: 'get'
    })
}

export const getTradeBuyList = (buyer, page) => {
    return instance({
        url: '/tradeinfo/buylist/' + buyer,
        method: 'get',
        params: {
            page,
        }
    })
}



