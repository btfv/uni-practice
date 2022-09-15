export class Flags {
  public static getImgByCountryCode(countryCode: string): string {
    return `https://countryflagsapi.com/png/${countryCode}`;
  }
}
