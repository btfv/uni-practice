import { CoinGeckoApi } from './coingecko';
import { CoinsApi } from './interface';

export class ServiceManager {
  private static currentApiIndex = 0;
  private static readonly apiList: CoinsApi[] = [new CoinGeckoApi()];

  public static async getCurrentService(): Promise<CoinsApi> {
    return this.apiList[this.currentApiIndex];
  }

  public static nextService() {
    this.currentApiIndex = (this.currentApiIndex + 1) % this.apiList.length;
  }
}
