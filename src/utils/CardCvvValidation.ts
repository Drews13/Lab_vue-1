export default function checkCvv(cvv) {
  const regExp = /^\d{3}$/;
  return cvv.search(regExp) !== -1;
}
