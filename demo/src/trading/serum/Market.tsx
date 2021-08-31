import React, { useEffect, useState, useContext } from 'react';
import { PublicKey } from '@solana/web3.js';
import { Market, MARKETS } from '@project-serum/serum';
import { useConnection } from 'trading/serum/Connection';
import { notify } from 'common/notifications';

export interface MarketInfo {
  address: PublicKey;
  name: string;
  programId: PublicKey;
  deprecated: boolean;
}

type MarketDetails  = {
  name: string,
  subname?: string,
  ticker: string,
  earningPerShare: number,
  totalShares: number,
  img: string,
  bio?: string,
}

export interface MarketContextValues {
  market: Market | null;
  marketInfo?: MarketInfo;
  marketDetails: MarketDetails;
  setMarketInfo: (newMarketInfo: MarketInfo) => void;
}

const MarketContext: React.Context<null | MarketContextValues> = React.createContext<null | MarketContextValues>(
  null,
);

const MARKET_DETAILS: Array<MarketDetails> = [
  {
    name: "Matthew Wolff",
    ticker: "WOLFF",
    earningPerShare: 30,
    totalShares: 1000000,
    img: 'assets/headshots/mwolff.webp',
  },
  {
    name: "Brian 'SMASH' Williams",
    subname: "Carolina Panthers | RB | #22",
    ticker: "SMASH",
    earningPerShare: 30,
    totalShares: 1000000,
    img: 'assets/headshots/smash.png',
    bio: 'Brian "Smash" Williams is a fictional character in the NBC/DirecTV(The 101 Network) drama television series Friday Night Lights portrayed by actor Gaius Charles. He is the starting running back of the Dillon High School Panthers. Considered the most talented player on the roster after quarterback Jason Street, Smash received his nickname from his father after hitting a water heater. Smash is believed to be based on Boobie Miles from the Friday Night Lights book and film.',
  },
];

/**
 * Provider for Market. Wraps all components needing market context
 * @param param0 
 * @returns 
 */
export function MarketProvider({ children }) {
  const connection = useConnection();
  const [marketInfo, setMarketInfo] = useState<MarketInfo>(MARKETS.find((m) => m.name === 'SRM/USDT'));
  const [market, setMarket] = useState<Market | null>();
  useEffect(() => {
    setMarket(null);
    Market.load(connection, marketInfo.address, {}, marketInfo.programId)
      .then(setMarket)
      .catch((e) =>
        notify({
          message: 'Error loading market',
          description: e.message,
          type: 'error',
        }),
      );
    // eslint-disable-next-line
  }, [connection, marketInfo]);

  return (
    <MarketContext.Provider
      value={{
        market,
        marketInfo,
        marketDetails: MARKET_DETAILS[1],
        setMarketInfo,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.market;
}


export function useMarketContext() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context;
}