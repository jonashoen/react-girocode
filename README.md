# react-girocode

[![npm package](https://badge.fury.io/js/react-girocode.svg)](https://www.npmjs.org/package/react-girocode)

A react component for displaying GiroCodes ([EPC QR code](https://en.wikipedia.org/wiki/EPC_QR_code)).

## Usage

### Import

```tsx
import { Girocode } from "react-girocode";
```

### Use

Minimal information:

```tsx
<Girocode recipient="John Doe" iban="DE23 3702 0500 0008 0901 00" />
```

The GiroCode of the above example looks like this:
</br>

![example GiroCode](https://raw.githubusercontent.com/jonashoen/react-girocode/main/example_girocode.png)

</br>

Typical use case:

```tsx
<Girocode
  recipient="John Doe"
  iban="DE23 3702 0500 0008 0901 00"
  amount={42}
  text="This is an example"
/>
```

</br>

You can also specify a custom render function if your needs exeed the simple visualization of the qr code:

```tsx
<Girocode
  recipient="John Doe"
  iban="DE23 3702 0500 0008 0901 00"
  render={(data) => <SomeFancyQrCodeComponent value={data} />}
/>
```

The `render` function receives a parameter `data` which contains the string content of the GiroCode.
Please notice that when displaying the GiroCode as qr code the error correction level must be medium.

</br>

All available parameters:

```tsx
interface Props {
  encoding?: Encoding;
  bic?: string;
  recipient: string; // maximum lenght of 70
  iban: string;
  amount?: number;
  purpose?: string; // maximum lenght of 4
  reference?: string; // maximum lenght of 25
  text?: string; // maximum lenght of 140
  information?: string; // maximum lenght of 70
  render?: (data: string) => React.ReactNode;
}
```

The input data gets validated by this package. So the IBAN, BIC and string inputs need to be valid. Some string parameters have a maximum lenght.

Also notice that the parameters `reference` and `text` can't be present at the same time.
