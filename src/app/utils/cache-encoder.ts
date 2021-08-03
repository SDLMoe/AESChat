import { GCM } from "../encryption.service";

export class CacheEncoder {

  public static encode(input: string): string {
    return GCM.urlsafe_escape(btoa(unescape(encodeURIComponent(input))));
  }

  public static decode(input: string): string {
    return decodeURIComponent(escape(atob(GCM.urlsafe_unescape(input))));
  }

}
