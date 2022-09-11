import {
  languageTagToNameMapper,
  supportedLanguages,
  translations,
} from './translations';
import { LanguageInfo, Props, SupportedLanguage } from './types';
import { capitalizeFirstLetter as doCapitalizeFirstLetter } from './utils';

export const DEFAULT_LANGUAGE: SupportedLanguage = supportedLanguages[0];

export class Translator {
  public static async getSupportedLanguages(): Promise<LanguageInfo[]> {
    return supportedLanguages.map((tag) => ({
      tag,
      imgUrl: `https://countryflagsapi.com/png/${tag}`,
      name: languageTagToNameMapper[tag],
    }));
  }

  public static async getLanguageInfo(
    tag: SupportedLanguage
  ): Promise<LanguageInfo> {
    return {
      tag,
      imgUrl: `https://countryflagsapi.com/png/${tag}`,
      name: languageTagToNameMapper[tag],
    };
  }

  public static getTranslation(
    tag: keyof typeof translations,
    language: typeof supportedLanguages[number],
    { capitalizeFirstLetter, uppercase }: Partial<Props> = {}
  ): string {
    let text = translations[tag][language];

    if (capitalizeFirstLetter) {
      text = doCapitalizeFirstLetter(text);
    }

    if (uppercase) {
      text = text.toUpperCase();
    }

    return text;
  }
}
