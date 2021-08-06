import { GCM } from "../encryption.service";
import { Buffer } from 'buffer'

export class CacheEncoder {

  public static encode(input: string): string {
    return GCM.urlsafe_escape(
      Buffer.from(
        unescape(encodeURIComponent(input)),
        'utf16le')
        .toString('base64')
    );
  }

  public static decode(input: string): string {
    return decodeURIComponent(escape(
      Buffer.from(
        GCM.urlsafe_unescape(input),
        'base64')
        .toString('utf16le')
    ));
  }

}
