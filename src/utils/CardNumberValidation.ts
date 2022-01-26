export default function checkNumber(number) {
  const regExp = /^(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)$/;
  return number.search(regExp) !== -1;
}
