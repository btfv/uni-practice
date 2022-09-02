import axios from 'axios';
import { CoinsApi } from '../interface';
import {
  Coin,
  CoinInfo,
  CoinInfoInput,
  CoinListInput,
  Fiat,
  HistoricalData,
  HistoricalDataInput,
} from '../types';
import {
  CoinInfoResponse,
  CoinListResponse,
  FiatResponse,
  HistoricalDataResponse,
} from './types';

const API_URL = 'https://api.coingecko.com/api/v3';
const SAMPLE_FIAT_TICKERS = ['usd', 'eur'];
const DEFAULT_COINS_LIMIT = 50;

interface InitParams {
  apiUrl?: string;
}

export class CoinGeckoApi implements CoinsApi {
  private readonly apiUrl: string;

  constructor({ apiUrl = API_URL }: InitParams = {}) {
    this.apiUrl = apiUrl;
  }

  public async getFiatList(): Promise<Fiat[]> {
    const { data } = await axios.get<FiatResponse>(
      `${this.apiUrl}/simple/supported_vs_currencies`
    );

    const vsTickersGroups = data.reduce(
      (chunks, currentTicker, currentIndex, vsTickers) => {
        if (!currentIndex || vsTickers[currentIndex - 1] > currentTicker) {
          return [...chunks, [currentTicker]];
        }

        chunks[chunks.length - 1].push(currentTicker);

        return chunks;
      },
      [] as string[][]
    );

    const fiats = vsTickersGroups
      .filter((group) =>
        group.some((ticker) => SAMPLE_FIAT_TICKERS.includes(ticker))
      )
      .flat();

    return fiats.map((id) => ({ id, ticker: id }));
  }

  public async getCoinList({
    fiatCurrencyId,
    page = 1,
    limit = DEFAULT_COINS_LIMIT,
  }: CoinListInput): Promise<Coin[]> {
    const { data } = await axios.get<CoinListResponse>(
      `${this.apiUrl}/coins/markets`,
      {
        params: {
          vs_currency: fiatCurrencyId,
          page,
          per_page: limit,
        },
      }
    );

    return data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      icon: coin.image,
      ticker: coin.symbol,
      currentPrice: coin.current_price,
      marketCap: coin.market_cap,
      totalVolume: coin.total_volume,
    }));
  }

  public async getHistoricalData({
    cryptoCurrencyId,
    fiatCurrencyId,
    range: { days },
  }: HistoricalDataInput): Promise<HistoricalData> {
    const { data } = await axios.get<HistoricalDataResponse>(
      `${this.apiUrl}/coins/${cryptoCurrencyId}/market_chart`,
      {
        params: {
          id: cryptoCurrencyId,
          vs_currency: fiatCurrencyId,
          days,
        },
      }
    );

    return {
      prices: data.prices.map(([timestamp, value]) => ({ timestamp, value })),
      volumes: data.total_volumes.map(([timestamp, value]) => ({
        timestamp,
        value,
      })),
      marketCaps: data.market_caps.map(([timestamp, value]) => ({
        timestamp,
        value,
      })),
    };
  }

  public async getCoinInfo({ id }: CoinInfoInput): Promise<CoinInfo> {
    const { data } = await axios.get<CoinInfoResponse>(
      `${this.apiUrl}/coins/${id}/`,
      {
        params: {
          market_data: false,
        },
      }
    );

    return data;
  }
}
