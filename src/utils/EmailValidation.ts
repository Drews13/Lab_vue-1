export default function checkEmail(email) {
  const regExp = /^.+@.+\..+$/;
  return email.search(regExp) !== -1
}
