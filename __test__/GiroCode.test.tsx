import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Girocode } from "../src/Girocode";

describe("Girocode tests", () => {
  test("Invalid IBAN", () => {
    const consoleMock = jest.spyOn(console, "error").mockImplementation();

    const iban = "Invalid Iban";

    expect(() => render(<Girocode iban={iban} recipient="John Doe" />)).toThrow(
      `Invalid IBAN "${iban}"`
    );

    consoleMock.mockRestore();
  });

  test("Invalid BIC", () => {
    const consoleMock = jest.spyOn(console, "error").mockImplementation();

    const bic = "Invalid Bic";

    expect(() =>
      render(
        <Girocode
          iban="DE23 3702 0500 0008 0901 00"
          recipient="John Doe"
          bic={bic}
        />
      )
    ).toThrow(`Invalid BIC "${bic}"`);

    consoleMock.mockRestore();
  });

  test("Valid data", () => {
    const component = render(
      <Girocode iban="DE23 3702 0500 0008 0901 00" recipient="John Doe" />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("Valid data with reference", () => {
    const component = render(
      <Girocode
        iban="DE23 3702 0500 0008 0901 00"
        recipient="John Doe"
        reference="Foo"
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("Valid data with text", () => {
    const component = render(
      <Girocode
        iban="DE23 3702 0500 0008 0901 00"
        recipient="John Doe"
        text="Foo"
      />
    );

    expect(component.asFragment()).toMatchSnapshot();
  });

  test("Input with limited lenght to long", () => {
    const consoleMock = jest.spyOn(console, "error").mockImplementation();

    const purpose = "Foo Bar";

    expect(() =>
      render(
        <Girocode
          iban="DE23 3702 0500 0008 0901 00"
          recipient="John Doe"
          purpose={purpose}
        />
      )
    ).toThrow(`Input "${purpose}" is longer than specified max lenght 4`);

    consoleMock.mockRestore();
  });

  test("Custom render function", () => {
    const iban = "DE23 3702 0500 0008 0901 00";
    const recipient = "John Doe";

    const component = render(
      <Girocode
        iban={iban}
        recipient={recipient}
        render={(data) => <p>{data}</p>}
      />
    );

    expect(
      component.getByText(iban.replace(/ /g, ""), { exact: false })
    ).toBeInTheDocument();
    expect(
      component.getByText(recipient, { exact: false })
    ).toBeInTheDocument();
  });
});
