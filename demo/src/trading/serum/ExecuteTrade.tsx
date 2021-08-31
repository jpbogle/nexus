import styled from 'styled-components';
import Colors from 'common/colors';

import { useOrderbookData } from "./Orderbook";
import { useMarketContext } from './Market';
import { useState } from 'react';

const Trade = styled.div`
  color: ${Colors.white};
  border-radius: 10px;
  overflow: hidden;
  background: ${Colors.darkBlue};
  margin: 5px;
  border: 1px solid rgb(64,73,78);
  
  .title {
    padding: 10px 25px;
    background: ${Colors.headerColor};
    width: 100%:
  }
  
  .line-item {
    display: flex;
    margin: 10px 25px;
    align-items: center;
    justify-content: space-between;
  }

  input {
    border: ${Colors.border};
    border-radius: 4px;    
    color: ${Colors.white};
    padding: 6px;
    text-align: right;
    background: none;
    outline: none;
    width: 82px;
  }

  #total {
    margin-top 20px;
    padding-top: 10px;
    border-top: ${Colors.border};
  }

  .execute {
    background: ${Colors.btnDisabled};
    padding: 6px;
    border: 1px solid ${Colors.white};
    border-radius: 9999px;
    text-align: center;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    width: 175px;

    &:hover {
      cursor: pointer;
      background: ${Colors.headerColor};
      transition: .1s all;
    }
  }
`;

export function ExecuteTrade() {
  const { marketPrice} = useOrderbookData();
  const { marketDetails } = useMarketContext();
  const [numShares, setNumShares] = useState(10);

  return (
    <Trade>
      <div className="title">Buy {marketDetails.ticker}</div>
      <div className="line-item">
        <div className="key">Shares</div>
        <div className="value"><input placeholder="Shares" type="number" onChange={(e) => setNumShares(parseInt(e.target.value))}/></div>
      </div>
      <div className="line-item">
        <div className="key">Price</div>
        <div className="value">${marketPrice.toFixed(2)}</div>
      </div>
      <div className="line-item" id="total">
        <div className="key">Total</div>
        <div className="value">${(marketPrice * numShares).toFixed(2)}</div>
      </div>
      <span className="execute">
        Coming Soon
      </span>
    </Trade>
  );
}


