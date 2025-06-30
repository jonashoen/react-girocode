import { StringOfLength } from "../src/constants";

describe("StringOfLength tests", () => {
  test("Input string to long", () => {
    const input = "FooBar";
    const max = 1;

    expect(() => StringOfLength(input, { max })).toThrow(
      `Input "${input}" is longer than specified max lenght ${max}`
    );
  });

  test("Input string shorter than maximum", () => {
    const input = "FooBar";
    const max = 10;

    expect(() => {
      const s = StringOfLength(input, { max });

      expect(s).toBe(input);
    }).not.toThrow();
  });

  test("Input string has max lenght", () => {
    const input = "FooBar";
    const max = 6;

    expect(() => {
      const s = StringOfLength(input, { max });

      expect(s).toBe(input);
    }).not.toThrow();
  });

  test("Input string undefined returns empty string", () => {
    const s = StringOfLength(undefined, { max: 0 });

    expect(s).toBe("");
  });
});
