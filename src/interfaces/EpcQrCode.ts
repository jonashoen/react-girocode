import ServiceTag from "./ServiceTag";
import Version from "./Version";
import Encoding from "./Encoding";
import Identification from "./Identification";

import StringOfLength from "./StringOfLenght";

interface BasicEpcQrCode {
  serviceTag: ServiceTag;
  version: Version;
  encoding: Encoding;
  identification: Identification;
  bic?: string;
  recipient: StringOfLength<70>;
  iban: string;
  amount?: number;
  reason?: StringOfLength<4>;
  information?: StringOfLength<70>;
}

interface EpcQrCodeWithReference extends BasicEpcQrCode {
  reference?: StringOfLength<25>;
  text?: never;
}

interface EpcQrCodeWithText extends BasicEpcQrCode {
  reference?: never;
  text?: StringOfLength<140>;
}

type EpcQrCode = EpcQrCodeWithReference | EpcQrCodeWithText;

const EpcQrCodeToString = (epcQrCode: EpcQrCode) => {
  const data = [
    epcQrCode.serviceTag,
    epcQrCode.version,
    epcQrCode.encoding,
    epcQrCode.identification,
    epcQrCode.bic,
    epcQrCode.recipient,
    epcQrCode.iban,
    epcQrCode.amount !== undefined
      ? `EUR${epcQrCode.amount.toFixed(2)}`
      : undefined,
    epcQrCode.reason,
    epcQrCode.reference,
    epcQrCode.text,
    epcQrCode.information,
  ].map((line) => line ?? "");

  return data.join("\n");
};

export default EpcQrCode;
export { EpcQrCodeToString };
