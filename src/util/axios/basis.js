import { instance } from "./axios.util"

export const getUserInfo=(uid)=>{
    return instance({
        url:`/user/${uid}`,
        method:'get'
    })
}

export const onPboardBest=()=>{
    return instance({
        url:`/pboard/best`,
        method:'get',
    })
}