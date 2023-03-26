import Swal from 'sweetalert2';

export const swalWarnPasswordInput = () => {
   return Swal.fire({
        text: "비밀번호를 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnPasswordForm = () => {
   return Swal.fire({
        text: "비밀번호 양식을 준수해주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })

}

export const swalWarnNotEqualPassword = () => {
   return Swal.fire({
        text: "비밀번호가 서로 일치하지 않습니다!",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalSuccessEqualPassword = () => {
   return Swal.fire({
        text: "비밀번호가 일치합니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
    })
}

export const swalWarnConfirmPassword = () => {
   return Swal.fire({
        text: "비밀번호 일치여부를 확인하여주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
    })
}

export const swalErrorVerification = () => {
   return Swal.fire({
        text: "위변조 검증이 성공적으로 이뤄지지 않았습니다. 다시 결제를 시도해주세요",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalQueryReviewWrite = () => {
   return Swal.fire({
        title: '결제 완료!',
        text: "리뷰를 쓰러 가시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '이동',
        cancelButtonText: '취소'
    })
}

export const swalErrorPayment = (msg) => {
   return Swal.fire({
        text: `결제가 실패하였습니다 : ${msg}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalErrorNonExistPayment = () => {
   return Swal.fire({
        text: "결제 내역이 없습니다!",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnPhoneNumberForm = () => {
   return Swal.fire({
        text: "전화번호 양식을 준수해주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnEmailForm = () => {
   return Swal.fire({
        text: "이메일 양식을 준수해 주세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalWarnNicknameInput = () => {
   return Swal.fire({
        text: "닉네임을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalQueryDeactivate = () => {
   return Swal.fire({
        text: "회원을 탈퇴하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '수정',
        cancelButtonText: '취소'
    })
}

export const swalSuccessDeactivate = () => {
   return Swal.fire({
        text: "탈퇴가 완료되었습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    })
}

export const swalWarnMessageDelete = () => {
   return Swal.fire({
        text: "메시지를 삭제하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    })
}

export const swalWarnLeaveChatroom = () => {
   return Swal.fire({
        text: "채팅방을 나가시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '퇴장',
        cancelButtonText: '취소'
    })
}

export const swalWarnEmailInput = () => {
   return Swal.fire({
        text: "이메일을 입력하세요",
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}





















