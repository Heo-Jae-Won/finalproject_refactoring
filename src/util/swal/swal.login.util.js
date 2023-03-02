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

export const swalWarnInputIdPassword = () => {
    Swal.fire({
        text: "아이디나 비밀번호를 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnInputGender = () => {
    Swal.fire({
        text: "성별을 선택하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnInputName = () => {
    Swal.fire({
        text: "이름을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnInputConfirmPassword = () => {
    Swal.fire({
        text: "확인용 비밀번호를 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnIdentifyPassword = () => { }
Swal.fire({
    text: "확인용 비밀번호와 변경하고자 하는 비밀번호가 일치하지 않습니다",
    icon: 'warning',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
})

export const swalQueryRegisterId = () => {
    Swal.fire({
        text: "회원으로 등록하시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '등록',
        cancelButtonText: '취소'
    })
}

export const swalWarnAuthenticate = () => {
    Swal.fire({
        text: "인증번호가 올바르지 않습니다.",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnExistId = () => {
    Swal.fire({
        text: "입력한 아이디는 가입되지 않은 아이디입니다",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnExistPassword = () => {
    Swal.fire({
        text: "비밀번호가 올바르지 않습니다",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalQueryRestoreId = () => {
    Swal.fire({
        text: "이미 탈퇴한 회원입니다. 아이디 복원 페이지로 이동하시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '이동',
        cancelButtonText: '취소'
    })
}

export const swalWarnInputIdEmail = () => {
    Swal.fire({
        text: "아이디와 이메일을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnExistEmail = () => {
    Swal.fire({
        text: "입력하신 이메일은 가입되지 않은 이메일입니다",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalSuccessTempPassword = () => {
    Swal.fire({
        text: "가입된 메일 주소로 임시 재발급 비밀번호가 발급되었습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}


















