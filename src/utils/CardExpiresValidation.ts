export default function checkExpires(expires) {
  const regExp = /^(0?[1-9]|1[012])-\d{4}$/;
  return expires.search(regExp) !== -1;
}
