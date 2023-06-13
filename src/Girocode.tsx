import React from "react";
import QRCode from "react-qr-code";
import { electronicFormatIBAN, isValidIBAN, isValidBIC } from "ibantools";

import ServiceTag from "./interfaces/ServiceTag";
import Version from "./interfaces/Version";
import Encoding from "./interfaces/Encoding";
import Identification from "./interfaces/Identification";

import StringOfLength from "./interfaces/StringOfLenght";
import EpcQrCode, { EpcQrCodeToString } from "./interfaces/EpcQrCode";

interface Props {
  encoding?: Encoding;
  bic?: string;
  recipient: string;
  iban: string;
  amount?: number;
  reason?: string;
  reference?: string;
  text?: string;
  information?: string;
  size?: number;
}

const Girocode: React.FC<Props> = ({
  encoding = Encoding.UTF_8,
  bic,
  recipient,
  iban,
  reason,
  reference,
  text,
  information,
  size,

  ...props
}) => {
  if (!isValidIBAN(electronicFormatIBAN(iban) as string)) {
    throw Error(`Invalid IBAN "${iban}"`);
  }

  if (bic && !isValidBIC(bic)) {
    throw Error(`Invalid BIC "${bic}"`);
  }

  const epcQrCode: EpcQrCode = {
    ...props,
    serviceTag: ServiceTag.BCD,
    version: Version.Two,
    encoding,
    identification: Identification.SCT,
    bic,
    recipient: StringOfLength(recipient, { max: 70 }),
    iban,
    reason: StringOfLength(reason, { max: 4 }),
    reference: StringOfLength(reference, { max: 25 }),
    text: StringOfLength(text, { max: 140 }),
    information: StringOfLength(information, { max: 70 }),
  };

  const codeData = EpcQrCodeToString(epcQrCode);

  return <QRCode value={codeData} level="M" size={size} />;
};

export default Girocode;
