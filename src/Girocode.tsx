import React from "react";
import { electronicFormatIBAN, isValidIBAN, isValidBIC } from "ibantools";
import QRCode from "react-qr-code";

import {
  Encoding,
  EpcQrCode,
  epcQrCodeToString,
  Identification,
  ServiceTag,
  StringOfLength,
  Version,
} from "./constants";

interface BasicProps {
  encoding?: Encoding;
  bic?: string;
  recipient: string;
  iban: string;
  amount?: number;
  reason?: string;
  information?: string;
  render?: (data: string) => React.ReactNode;
}

interface PropsWithReference extends BasicProps {
  reference?: string;
  text?: never;
}

interface PropsWithText extends BasicProps {
  reference?: never;
  text?: string;
}

type Props = PropsWithReference | PropsWithText;

export function Girocode({
  encoding = Encoding.UTF_8,
  bic,
  recipient,
  iban,
  amount,
  reason,
  reference,
  text,
  information,
  render,
}: Props): React.ReactNode {
  if (!isValidIBAN(electronicFormatIBAN(iban)!)) {
    throw Error(`Invalid IBAN "${iban}"`);
  }

  if (bic && !isValidBIC(bic)) {
    throw Error(`Invalid BIC "${bic}"`);
  }

  const epcQrCode: EpcQrCode = {
    serviceTag: ServiceTag.BCD,
    version: Version.Two,
    encoding,
    identification: Identification.SCT,
    bic,
    recipient: StringOfLength(recipient, { max: 70 }),
    iban: electronicFormatIBAN(iban)!,
    amount,
    reason: StringOfLength(reason, { max: 4 }),
    information: StringOfLength(information, { max: 70 }),
  };

  if (reference) {
    epcQrCode.reference = StringOfLength(reference, { max: 25 });
  }

  if (text) {
    epcQrCode.text = StringOfLength(text, { max: 140 });
  }

  const codeData = epcQrCodeToString(epcQrCode);

  if (render) {
    return render(codeData);
  }

  return <QRCode value={codeData} level="M" />;
}
