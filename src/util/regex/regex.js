//  8 ~ 10 char combination of number + alaphabet
export const onCheckPassword = (password) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
    const result = regExp.test(password);
    if (!result)
        return result;
}

export const onCheckPhoneNumber = (phoneNumber) => {
    var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
    const result = regExp.test(phoneNumber);
    if (!result)
        return result;
}

//validate email
export const onCheckEmail = (email) => {
    var regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    const result = regExp.test(email);
    if (!result)
        return result;
}