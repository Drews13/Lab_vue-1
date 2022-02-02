import RegExprs from '@/constants/RegExprs';

function checkCvv(cvv: string) {
  return cvv.search(RegExprs.cardCVVRegEx) !== -1;
}

function checkExpires(expires: string) {
  return expires.search(RegExprs.cardExpiresRegEx) !== -1;
}

function checkNumber(number: string) {
  return number.search(RegExprs.cardNumberRegEx) !== -1;
}

function checkEmail(email: string) {
  return email.search(RegExprs.eMailRegEx) !== -1;
}

function checkLogin(login: string) {
  return login.length > 0;
}

function checkPasswordsEquality(password: string, repeatedPassword: string) {
  return password === repeatedPassword;
}

function checkPassword(password: string) {
  return password.length > 4;
}

export default {
  checkCvv,
  checkExpires,
  checkNumber,
  checkEmail,
  checkLogin,
  checkPasswordsEquality,
  checkPassword
}
