export type CoinListResponse = {
  id: string;
  symbol: string;
  name: string;

  current_price: number;
  market_cap: number;
  total_volume: number;
  total_supply: number;
  max_supply: number;

  image?: string;
}[];

export type FiatResponse = string[];

export type HistoricalDataResponse = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

export type CoinInfoResponse = {
  id: string;
  symbol: string;
  name: string;

  hashing_algorithm: string;
  categories: string[];
  localization: Record<string, string>;
  description: Record<string, string>;

  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];

    twitter_screen_name: string;
    facebook_username: string;
    telegram_channel_identifier: string;
    subreddit_url: string;
  };

  image: {
    thumb: string;
    small: string;
    large: string;
  };

  country_origin: string;
  genesis_date: string;

  market_cap_rank: number;
};
