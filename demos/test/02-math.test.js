const { sum, multiply, divide } = require("../src/02-math");

test("1 + 3 should be 4", () => {
  const res = sum(1, 3);

  expect(res).toBe(4);
});

test("1 * 4 should be 4", () => {
  const res = multiply(1, 4);

  expect(res).toBe(4);
});

test("6 * 3 should be 2", () => {
  const res = divide(6, 3);

  expect(res).toBe(2);
});

test("should divide zero", () => {
  const res = divide(6, 0);

  expect(res).toBeNull();
});
