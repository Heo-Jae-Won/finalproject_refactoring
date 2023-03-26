import Swal from 'sweetalert2';

export const swalBoardDelete = () => {
   return Swal.fire({
        text: "해당 상품은 판매되었거나 삭제된 상품입니다",
        icon: 'error',
        confirmButtonColor: '#3085d6',
    })
}

export const swalAlertFileUploadSizeError = () => {
   return Swal.fire({
        text: '파일의 용량이 250MB를 초과하여 업로드할 수 없습니다.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}

export const swalAlertFileUploadTypeError = () => {
   return Swal.fire({
        text: "이미지 파일의 확장자는 jpg와 png만 가능합니다.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
    })
}

export const swalErrorImageType=()=>{
   return Swal.fire({
        text: '이미지 파일이 png나 jpeg가 아닙니다.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
    })
}
