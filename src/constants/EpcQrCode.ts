import {
  Encoding,
  Identification,
  ServiceTag,
  StringOfLength,
  Version,
} from ".";

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

export type EpcQrCode = EpcQrCodeWithReference | EpcQrCodeWithText;

export const epcQrCodeToString = (epcQrCode: EpcQrCode) => {
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
