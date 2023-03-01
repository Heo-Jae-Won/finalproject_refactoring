import { instance } from "./axios.util"

export const onUserRestore=(formData)=>{
    return instance({
        url:'/user/restore',
        method:'post',
        data:formData
    })
}
