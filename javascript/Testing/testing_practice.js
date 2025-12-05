function capitalizeString(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function reverseString(value) {
  return value.split("").reverse().join("");
}

function analyzeArray(array) {
  if (
    !Array.isArray(array) ||
    array.length === 0 ||
    array.some((num) => typeof num !== "number")
  ) {
    throw new Error("Invalid input");
  }

  return {
    average: array.reduce((a, b) => a + b, 0) / array.length,
    max: Math.max(...array),
    min: Math.min(...array),
    length: array.length,
  };
}

class Calculator {
  constructor(num1, num2) {
    (this.num1 = num1), (this.num2 = num2);
  }

  add(num1, num2) {
    return num1 + num2;
  }

  subtract(num1, num2) {
    return num1 - num2;
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  divide(num1, num2) {
    return num1 / num2;
  }
}

function caesarCipher(text, shift) {
  const alphabetSize = 26;

  return text
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      // Uppercase A–Z
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % alphabetSize) + 65);
      }

      // Lowercase a–z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % alphabetSize) + 97);
      }

      // Non-letter
      return char;
    })
    .join("");
}

module.exports = {
  Calculator,
  capitalizeString,
  reverseString,
  caesarCipher,
  analyzeArray,
};
