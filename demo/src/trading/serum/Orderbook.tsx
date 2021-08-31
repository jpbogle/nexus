import { useEffect, useState } from 'react';
import { Market, Orderbook } from '@project-serum/serum';
import { useConnection } from 'trading/serum/Connection';
import { useMarket } from './Market';
import styled from 'styled-components';
import { ColumnHeightOutlined, ColumnWidthOutlined } from '@ant-design/icons';
import Colors from 'common/colors';

const StyledOrderbook = styled.div`
  color: ${Colors.white};
  background: ${Colors.darkBlue};
  border: ${Colors.border};
  padding: 20px;
  margin: 5px;

  .title {
    text-align: center;
    margin-bottom: 10px;

    span {
      margin: 0px 10px;
      transition: .2s all;
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .header {
    color: ${Colors.lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    gap: 10px;
  }

  #spread {
    display: flex;
    justify-content: space-between;
    text-align: right;
    padding: 4px;
    margin: 4px;
    font-family: -apple-system,BlinkMacSystemFont;

    #arrow { 
      margin-left: 5px;
    }
  }
`;

type StyledOrderType = {
  isBid?: boolean,
}

const StyledOrder = styled.div<StyledOrderType>`
  display: flex;
  justify-content: space-between;
  margin: 1px;
  padding: 1px;
  position: relative;
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont;

  .bar {
    right: 0;
    position: absolute;
    height: 100%;
    z-index: 0;
    background: ${(props) => props.isBid ? 'rgba(2, 199, 122, 0.25)' : 'rgba(255, 59, 105, 0.25)'};
  }
  .price {
    z-index: 1;
    color: ${(props) => props.isBid ? Colors.green : Colors.red};
  }
`;

const StyledHorizontalOrderbook = styled.div`
  .bid-asks {
    display: flex;
    justify-content: space-between;
    gap: 20px;

    .col {
      flex-grow: 1;
    }
  }
`;

export async function getOrderbook(
  connection,
  market: Market,
  depth = 8,
): Promise<{ bids: number[][]; asks: number[][] }> {
  // @ts-ignore
  const bidAccountInfoPromise = connection.getAccountInfo(market && market._decoded.bids);
  // @ts-ignore
  const askAccountInfoPromise = connection.getAccountInfo(market && market._decoded.asks);
  const bidAccountInfo = await bidAccountInfoPromise;
  const askAccountInfo = await askAccountInfoPromise;

  // bids
  const bidData = bidAccountInfo.data;
  const bidOrderbook = market && bidData ? Orderbook.decode(market, bidData) : null;
  const bids = bidOrderbook.getL2(depth).map(([price, size]) => [price, size]);
  // asks
  const askData = askAccountInfo.data;
  const askOrderbook = market && askData ? Orderbook.decode(market, askData) : null;
  const asks = askOrderbook.getL2(depth).map(([price, size]) => [price, size]);

  return { bids, asks };
}

export function useOrderbookData() {
  const market = useMarket()
  const connection = useConnection();
  const [marketPrice, setMarketPrice] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [{bids, asks}, setBidAsks] = useState({bids: [], asks: []});
  useEffect(() => {
    const interval = setInterval(() => {
      if (market && connection) {
        getOrderbook(connection, market).then((bidAsks) => {
          const { bids, asks } = bidAsks;
          const bb = bids?.length > 0 && bids[0][0];
          const ba = asks?.length > 0 && asks[0][0];
          const price = (bb + ba) / 2;
          setPercentChange((marketPrice - price) / price);
          setMarketPrice(price);
          setBidAsks(bidAsks);
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [connection, market, marketPrice, percentChange]);
  return {bids, asks, marketPrice, percentChange};
}


export function OrderbookData() {
  const {bids, asks, marketPrice, percentChange} = useOrderbookData();
  const [displayVertical, setDisplayVertical] = useState(true);
  const asksElements = asks.map(([price, quantity]) => (
    <StyledOrder key={price}>
      <div className="quantity">{quantity.toFixed(2)}</div>
      <div className="price">${price.toFixed(2)}</div>
      <div className="bar" style={{ width: `${((marketPrice - price) * 100 / marketPrice)}%` }}/>
    </StyledOrder>
  ));

  const bidsElements = bids.map(([price, quantity]) => (
    <StyledOrder isBid key={price}>
      <div className="quantity">{quantity.toFixed(2)}</div>
      <div className="price">${price.toFixed(2)}</div>
      <div className="bar" style={{ width: `${((price -  marketPrice) * 100 / marketPrice)}%` }}/>
    </StyledOrder>
  ));

  const spread = (
    <div id="spread" style={{ background: percentChange > 0 ? "rgb(65, 199, 122, 0.06)" : "rgba(242, 59, 105, 0.06)" }}>
      <div id="percent-move" style={{ color: percentChange > 0 ? Colors.green : Colors.red }}>
        {(percentChange * 100).toFixed(2)}%
      </div>
      <div id="market-price" style={{ color: percentChange > 0 ? Colors.green : Colors.red }}>
        ${marketPrice.toFixed(2)}
        {percentChange > 0 ? (
          <i id="arrow" className="fas fa-arrow-up" />
        ) : (
          <i id="arrow" className="fas fa-arrow-down" />
        )}
      </div>
    </div>
  )

  return (
    <StyledOrderbook>
      <div className="title">
        Orderbook
        {displayVertical
          ? <ColumnWidthOutlined onClick={() => setDisplayVertical(false)} />
          : <ColumnHeightOutlined onClick={() => setDisplayVertical(true)} />}
      </div>
      {displayVertical
      ? (
        <>
          <div className="header">
            <div>Size</div>
            <div>Price (USD)</div>
          </div>
          <div style={{ flexDirection: 'column-reverse', display: 'flex' }}>
            {asksElements}
          </div>
          {spread}
          <div>
            {bidsElements}
          </div>
        </>
      ) : (
        <StyledHorizontalOrderbook>
          {spread}
          <div className="bid-asks">
            <div className="col">
              <div className="header">
                <div>Size</div>
                <div>Price (USD)</div>
              </div>
              {asksElements}
            </div>
            <div className="col">
              <div className="header">
                <div>Size</div>
                <div>Price (USD)</div>
              </div>
              {bidsElements}
            </div>
          </div>
        </StyledHorizontalOrderbook>
      )}

    </StyledOrderbook>
  );
}