import {
  Encoding,
  epcQrCodeToString,
  Identification,
  ServiceTag,
  StringOfLength,
  Version,
} from "../src/constants";

describe("EpcQrCode tests", () => {
  test("Full information with reference", () => {
    const stringData = epcQrCodeToString({
      serviceTag: ServiceTag.BCD,
      version: Version.Two,
      encoding: Encoding.UTF_8,
      identification: Identification.SCT,
      bic: "BFSWDE33XXX",
      recipient: StringOfLength("John Doe", { max: 70 }),
      iban: "DE23 3702 0500 0008 0901 00",
      amount: 42,
      purpose: StringOfLength("Foo", { max: 4 }),
      reference: StringOfLength("Bar", { max: 25 }),
      information: StringOfLength("Foo Bar", { max: 70 }),
    });

    expect(stringData).toBe(
      `
        BCD
        002
        1
        SCT
        BFSWDE33XXX
        John Doe
        DE23 3702 0500 0008 0901 00
        EUR42.00
        Foo
        Bar
        
        Foo Bar
      `
        .trim()
        .replace(/^[ ]*/gm, "")
    );
  });

  test("Full information with text and reference", () => {
    const stringData = epcQrCodeToString({
      serviceTag: ServiceTag.BCD,
      version: Version.Two,
      encoding: Encoding.UTF_8,
      identification: Identification.SCT,
      bic: "BFSWDE33XXX",
      recipient: StringOfLength("John Doe", { max: 70 }),
      iban: "DE23 3702 0500 0008 0901 00",
      amount: 42,
      purpose: StringOfLength("Foo", { max: 4 }),
      text: StringOfLength("Bar", { max: 140 }),

      information: StringOfLength("Foo Bar", { max: 70 }),
    });

    expect(stringData).toBe(
      `
        BCD
        002
        1
        SCT
        BFSWDE33XXX
        John Doe
        DE23 3702 0500 0008 0901 00
        EUR42.00
        Foo

        Bar
        Foo Bar
      `
        .trim()
        .replace(/^[ ]*/gm, "")
    );
  });

  test("Minimal information", () => {
    const stringData = epcQrCodeToString({
      serviceTag: ServiceTag.BCD,
      version: Version.Two,
      encoding: Encoding.UTF_8,
      identification: Identification.SCT,
      recipient: StringOfLength("John Doe", { max: 70 }),
      iban: "DE23 3702 0500 0008 0901 00",
      information: StringOfLength("Foo", { max: 70 }),
    });

    expect(stringData).toBe(
      `
        BCD
        002
        1
        SCT
        
        John Doe
        DE23 3702 0500 0008 0901 00
        
        

        
        Foo
      `
        .trim()
        .replace(/^[ ]*/gm, "")
    );
  });
});
