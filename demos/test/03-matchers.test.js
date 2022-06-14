test("test obj", () => {
  const data = { name: "Vic " };
  data.lastname = "Flores";
  expect(data).toEqual({ name: "Vic ", lastname: "Flores" });
});

test("test null", () => {
  const data = null;

  expect(data).toBeNull();
  expect(data).toBeDefined();
  expect(data).not.toBeUndefined();
});

test("test bolean", () => {
  expect(true).toEqual(true);
  expect(false).toEqual(false);

  expect(0).toBeFalsy();
  expect("").toBeFalsy();
  expect(false).toBeFalsy();
});

test("test strings", () => {
  expect("Madeleyne").toMatch(/dele/);
});

test("test arrays", () => {
  const numbers = [1, 2, 3];

  expect(numbers).toContain(3);
});
