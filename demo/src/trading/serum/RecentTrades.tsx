import { useEffect, useState } from 'react';
import { useMarket } from './Market';
import styled from 'styled-components';
import Colors from 'common/colors';
import BonfidaApi from './util/bonfida';

const StyledRecentTrades = styled.div`
  height: 130px;
  overflow: scroll;
  margin: 5px;
  color: ${Colors.white};
  background: ${Colors.darkBlue};
  border: ${Colors.border};
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont;

  .header {
    color: ${Colors.lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 8px;
  }

  .row {
    div {
      flex: 1;
      text-align: center;
    }
    display: flex;
    justify-content: space-between;
  }

  #orders {
    font-size: 14px;
  }
`;

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

// export function useFillsData() {
//   const market = useMarket()
//   const connection = useConnection();
//   const [fillsData, setFillsData] = useState([]);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (market) {
//         market.loadFills(connection, 1000).then((fills) => {
//           console.log(market, fills);
//           setFillsData(fills)});
//       }
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [connection, market]);
//   return fillsData;
// }


export function useBonfidaTrades() {
  const market = useMarket();
  const [recentTrades, setRecentTrades] = useState([]);
  useEffect(() => {
    const interval = setInterval(function getRecentTrades() {
      if (market) {
        const marketAddress = market?.address.toBase58();
        BonfidaApi.getRecentTrades(marketAddress).then((recents) => {
          setRecentTrades(recents ? recents.slice(0,50) : [])});
      }
      return getRecentTrades;
    }(), 10000);
    return () => clearInterval(interval);
  }, [market]);
  return recentTrades;
}

export function RecentTrades() {
  const recentTrades = useBonfidaTrades();
  return (
    <StyledRecentTrades>
      <div className="row header">
        <div>Price (USD)</div>
        <div>Size</div>
        <div>Time</div>
      </div>
      <div id="orders">
        {recentTrades.map(({ price, size, side, time }) => (
          <div className="row" key={time}>
            <div className="price" style={{ color: side === 'buy' ? Colors.green : Colors.red }}>${price.toFixed(2)}</div>
            <div className="quantity">{size.toFixed(2)}</div>
            <div className="time">{new Date(time).toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'numeric', second:'numeric'})}</div>
          </div>
        ))}
      </div>
    </StyledRecentTrades>
  );
}