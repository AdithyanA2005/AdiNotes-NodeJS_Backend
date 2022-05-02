function noSpecialCharacters(str) {
  // Checks that the string only contain letters, digits, underscores
  const convertedString = /^\w+$/.test(str);
  return convertedString;
}

function onlyLettersAndSpaces(str) {
  // Checks that the string only contains letters and spaces
  const convertedString = /^[A-Za-z\s]*$/.test(str);
  return convertedString;
}

module.exports = {
  noSpecialCharacters,
  onlyLettersAndSpaces,
};
