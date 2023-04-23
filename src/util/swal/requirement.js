import Swal from 'sweetalert2'

export const requireInput = () => {
    return Swal.fire({
         text: "해당 항목은 필수 항목입니다.",
         icon: 'info',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
     })
 }

 export const requireValidationPass = () => {
    return Swal.fire({
         text: "양식을 준수하여 작성해주세요",
         icon: 'info',
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
     })
 }



 export const requireEqualityPassword = () => {
    return Swal.fire({
         text: "비밀번호 일치여부를 확인하여주세요",
         icon: 'warning',
         confirmButtonColor: '#3085d6',
     })
 }