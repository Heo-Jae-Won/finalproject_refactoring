import Swal from 'sweetalert2';
export const swalQueryRestoreUserId = () => {
    Swal.fire({
        text: "아이디를 복원하시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '복원',
        cancelButtonText: '취소'
    })
}

export const swalSuccessRestore = () => {
    Swal.fire({
        text: "아이디 복원을 완료하였습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalSuccessDuplicationCheckNickname = () => {
    Swal.fire({
        text: "사용 가능한 닉네임입니다",
        icon: 'success',
        confirmButtonColor: '#3085d6',
    })
}

export const swalfailDuplicationCheckUnickname = () => {
    Swal.fire({
        text: "닉네임이 중복되었습니다",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnIdInput = () => {
    Swal.fire({
        text: "아이디를 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalSuccessDuplicationCheckId = () => {
    Swal.fire({
        text: "사용 가능한 아이디입니다",
        icon: 'success',
        confirmButtonColor: '#3085d6',
    })
}

export const swalfailDuplicationCheckId = () => {
    Swal.fire({
        text: "중복된 아이디라서 사용할 수 없습니다",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}





