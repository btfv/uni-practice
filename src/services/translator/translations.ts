export const supportedLanguages = ['ru', 'gb'] as const;

export const languageTagToNameMapper: {
  [lang in typeof supportedLanguages[number]]: string;
} = {
  ru: 'RU',
  gb: 'EN',
};

export const supportedTags = [
  'cryptocurrencies',
  'showStats',
  'chooseComparedCurrency',
  'name',
  'marketCap',
  'currentPrice',
  'totalVolume',
  'chooseLanguage',
  'language',
  'changeLanguage',
  'changeComparedCurrency',
  'fiat',
  'price',
  'rowsPerPage',
  'page',
] as const;

type Translations = Record<
  typeof supportedTags[number],
  { [lang in typeof supportedLanguages[number]]: string }
>;

export const translations: Translations = {
  cryptocurrencies: {
    gb: 'cryptocurrencies',
    ru: 'криптовалюты',
  },
  showStats: {
    gb: 'show stats',
    ru: 'показать статистику',
  },
  chooseComparedCurrency: {
    gb: 'choose compared currency',
    ru: 'выберете валюту для сравнения',
  },
  name: {
    gb: 'name',
    ru: 'название',
  },
  marketCap: {
    gb: 'market cap',
    ru: 'рыночная капитализация',
  },
  currentPrice: {
    gb: 'current price',
    ru: 'текущая цена',
  },
  totalVolume: {
    gb: 'total volume',
    ru: 'общий объем торгов',
  },
  chooseLanguage: {
    gb: 'choose language',
    ru: 'выберете язык',
  },
  language: {
    gb: 'language',
    ru: 'язык',
  },
  changeLanguage: {
    gb: 'change language',
    ru: 'изменить язык',
  },
  changeComparedCurrency: {
    gb: 'change compared currency',
    ru: 'изменить валюту для сравнения',
  },
  fiat: {
    gb: 'fiat',
    ru: 'традиционная валюта',
  },
  price: {
    gb: 'price',
    ru: 'цена',
  },
  rowsPerPage: {
    gb: 'rows per page',
    ru: 'рядов в странице',
  },
  page: {
    gb: 'page',
    ru: 'страница',
  },
};
