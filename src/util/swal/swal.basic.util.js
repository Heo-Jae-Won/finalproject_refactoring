import Swal from 'sweetalert2';
export const swalQueryInsert = () => {
    Swal.fire({
        text: "등록하시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '등록',
        cancelButtonText: '취소'
    })
}

export const swalSuccessInsert = () => {
    Swal.fire({
        text: "등록이 완료되었습니다",
        icon: 'success',
        confirmButtonColor: '#3085d6',
    })
}

export const swalQueryUpdate = () => {
    Swal.fire({
        text: "정말로 수정하시겠습니까?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '수정',
        cancelButtonText: '취소'
    })
}

export const swalError = () => {
    Swal.fire({
        text: "예상치 못한 오류가 발생하였습니다",
        icon: 'error',
        confirmButtonColor: '#3085d6',
    })
}

export const swalSuccessUpdate = () => {
    Swal.fire({
        text: "수정을 완료하였습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalQueryDelete = () => {
    Swal.fire({
        text: "정말로 삭제하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
    })
}

export const swalSuccessDelete = () => {
    Swal.fire({
        text: "삭제를 완료하였습니다!",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}