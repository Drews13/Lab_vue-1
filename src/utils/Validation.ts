import RegExprs from '@/constants/RegExprs';
import Constants from '@/constants/Constants';

function checkExpires(expires: string) {
  return expires.search(RegExprs.cardExpiresRegEx) !== -1;
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

function checkDate(date: string) {
  return date.search(RegExprs.dateRegEx) !== -1;
}

function checkRating(rating: string) {
  return rating && Number(rating) <= Constants.maxProductRating 
  && Number(rating) >= Constants.minProductRating;
}

function checkPrice(price: string) {
  return price.search(RegExprs.priceRegEx) !== -1;
}

export default {
  checkExpires,
  checkEmail,
  checkLogin,
  checkPasswordsEquality,
  checkPassword,
  checkDate,
  checkRating,
  checkPrice
}
