import { supportedLanguages, supportedTags } from './translations';

export interface Props {
  capitalizeFirstLetter: boolean;
  uppercase: boolean;
}

export interface LanguageInfo {
  tag: string;
  name: string;
  imgUrl: string;
}

export type SupportedLanguage = typeof supportedLanguages[number];
export type SupportedTag = typeof supportedTags[number];
