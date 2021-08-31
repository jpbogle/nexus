
export const BONFIDA_DATA_FEED = 'https://serum-api.bonfida.com/tv';

export interface BonfidaVolume {
  volumeUsd: number,
  volume: number,
}

export interface BonfidaTrade {
  market: string;
  size: number;
  price: number;
  orderId: string;
  time: number;
  side: string;
  feeCost: number;
  marketAddress: string;
}

export default class BonfidaApi {
  static URL: string = 'https://serum-api.bonfida.com/';
  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path);
      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.success ? responseJson.data : null;
      }
    } catch (err) {
      console.log(`Error fetching from Bonfida API ${path}: ${err}`);
    }
    return null;
  }

  static async getVolume(
    marketName: string,
  ): Promise<BonfidaVolume[] | null> {
    return BonfidaApi.get(`volumes/${marketName}`);
  }

  static async getRecentTrades(
    marketAddress: string,
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(`trades/address/${marketAddress}`);
  }
}

