# react-girocode

[![npm package](https://badge.fury.io/js/react-girocode.svg)](https://www.npmjs.org/package/react-girocode)

A react component for displaying GiroCodes.

## Usage

### Import

```ts
import Girocode from "react-girocode";
```

### Use

Minimal information:

```js
<Girocode recipient="John Doe" iban="DE00112233445566778899" />
```

</br>

Typical use case:

```js
<Girocode
  recipient="John Doe"
  iban="DE00112233445566778899"
  amount={42}
  text="This is an example"
/>
```

</br>

You can also specify a custom render function if your needs exeed the simple visualization of the qr code:

```js
<Girocode
  recipient="John Doe"
  iban="DE00112233445566778899"
  render={(data) => <SomeFancyQrCodeComponent value={data} />}
/>
```

The `render` function receives a parameter `data` which contains the string content of the GiroCode.
Please notice that when displaying the GiroCode as qr code the error correction level must be medium.

</br>

All available parameters:

```ts
interface Props {
  encoding?: Encoding;
  bic?: string;
  recipient: string; // maximum lenght of 70
  iban: string;
  amount?: number;
  reason?: string; // maximum lenght of 4
  reference?: string; // maximum lenght of 25
  text?: string; // maximum lenght of 140
  information?: string; // maximum lenght of 70
  render?: (data: string) => React.ReactNode;
}
```

The input data gets validated by this package. So the IBAN, BIC and string input needs to be valid. Some string parameters have a maximum lenght.
