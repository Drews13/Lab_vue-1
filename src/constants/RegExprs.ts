export default {
  cardCVVRegEx: /^\d{3}$/,
  cardExpiresRegEx: /^(0?[1-9]|1[012])-\d{4}$/,
  cardNumberRegEx: /^(?<!\d)\d{16}(?!\d)|(?<!\d[ _-])(?<!\d)\d{4}(?:[_ -]\d{4}){3}(?![_ -]?\d)$/,
  eMailRegEx: /^.+@.+\..+$/,
  ageRegEx: /^[1-9]?\d$/,
  dateRegEx: /^\d{4}[-](0?[1-9]|1[0-2])[/-](0?[1-9]|[12][0-9]|3[01])$/
}
