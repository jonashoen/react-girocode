import ServiceTag from "@interfaces/ServiceTag";
import Version from "@interfaces/Version";
import Encoding from "@interfaces/Encoding";
import Identification from "@interfaces/Identification";

import StringOfLength from "@interfaces/StringOfLenght";

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
    epcQrCode.bic ?? "",
    epcQrCode.recipient,
    epcQrCode.iban,
    epcQrCode.amount ? `EUR${epcQrCode.amount.toFixed(2)}` : "",
    epcQrCode.reason ?? "",
    epcQrCode.reference ?? "",
    epcQrCode.text ?? "",
    epcQrCode.information ?? "",
  ];

  return data.join("\n");
};

export default EpcQrCode;
export { EpcQrCodeToString };
