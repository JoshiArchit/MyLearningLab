const {
  Calculator,
  capitalizeString,
  reverseString,
  caesarCipher,
  analyzeArray,
} = require("./testing_practice");

const calculator = new Calculator();

test("capitalizeString returns dummyString as DummyString", () => {
  expect(capitalizeString("dummyString")).toBe("DummyString");
});

test("reverseString returns helloworld as dlrowolleh", () => {
  expect(reverseString("helloworld")).toBe("dlrowolleh");
});

test("add 1 + 2 equals to 3", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("subtract 4 - 2 equals to 2", () => {
  expect(calculator.subtract(4, 2)).toBe(2);
});

test("multiply 7 * 7 equals to 49", () => {
  expect(calculator.multiply(7, 7)).toBe(49);
});

test("divide 36 / 6 equals to 6", () => {
  expect(calculator.divide(36, 6)).toBe(6);
});

test("caesar cipher shifts lowercase letters correctly", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});

test("caesar cipher shifts uppercase letters correctly", () => {
  expect(caesarCipher("ABC", 3)).toBe("DEF");
});

test("caesar cipher wraps from z to a", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("caesar cipher wraps from Z to A", () => {
  expect(caesarCipher("XYZ", 3)).toBe("ABC");
});

test("caesar cipher handles mixed case strings", () => {
  expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
});

test("caesar cipher preserves punctuation and spaces", () => {
  expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
});

test("analyze array throws error for empty array", () => {
  expect(() => analyzeArray([])).toThrow("Invalid input");
});

test("analyze array throws error for malformed input", () => {
  expect(() => analyzeArray(["1, 2, 3"])).toThrow("Invalid input");
});

test("analyze array returns the correct object", () => {
  let expectedObj = {
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  };

  let result = analyzeArray([1, 8, 3, 4, 2, 6]);
  expect(result).toEqual(expectedObj);
});

test("analyze array handles negative numbers", () => {
  let expected = {
    average: 0.666,
    min: -6,
    max: 8,
    length: 6,
  };

  let result = analyzeArray([1, 8, 3, -4, 2, -6]);

  expect(result.min).toBe(expected.min);
  expect(result.max).toBe(expected.max);
  expect(result.length).toBe(expected.length);
  expect(result.average).toBeCloseTo(expected.average);
});
