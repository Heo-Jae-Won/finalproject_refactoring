import { instance } from "./axios.util"

export const onUserRestore = (formData) => {
    return instance({
        url: '/user/restore',
        method: 'post',
        data: formData
    })
}

export const checkDuplicateNicknames = (unickname) => {
    return instance({
        url: `/user/data/${unickname}`,
        method: 'get'
    })
}

export const checkDuplicateId = (id) => {
    return instance({
        url: `/user/${id}`,
        method: 'get'
    })
}

export const authenticateUser = (utel) => {
    return instance({
        url: `/user/authentification/${utel}`,
        method: 'get'
    })
}

export const registerUser = (formData) => {
    return instance({
        url: `/user`,
        method: 'post',
        data: formData
    })
}

export const onLogin = (form) => {
    return instance({
        url: `/user/login`,
        method: 'post',
        data: form
    })
}

export const sendTempPassword = (form) => {
    return instance({
        url: `/user/password`,
        method: 'post',
        data: form
    })
}

export const FindId=(email,name)=>{
return instance({
    url:`/user/id/${email}/${name}`,
    method:'get'
})
}
