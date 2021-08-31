import styled from 'styled-components';
import Colors from 'common/colors';

import { useOrderbookData } from "./Orderbook";
import { useMarketContext } from './Market';
import { useEffect, useState } from 'react';
import BonfidaApi from './util/bonfida';

const Bio = styled.div`
  padding: 10px 15px;
  color: ${Colors.lightGray};
  overflow: scroll;
  display: flex;
  justify-content: center;
  
  .content {
    line-height: 1.6;
    font-size: 14px;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Colors.white};
  text-align: right;
  padding: 12px 0px 12px 0px;
  background: ${Colors.headerColor};
  font-size: 14px;

  .stat:nth-child(2),.stat:nth-child(3),.stat:nth-child(4)  {
    border-left: 1px solid rgb(67, 74, 89);
  }
  .stat {
    flex-grow 1;
    text-align: center;

    .name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .value {
      color: ${Colors.lightGray};
    }
  }
`;

const StyledInstrument = styled.div`
  border: ${Colors.border};
  background: ${Colors.darkBlue};
  border-radius: 10px;
  overflow: hidden;
  margin: 5px;
  max-width: calc(100% - 10px);

  #ticker-info {
    display: flex;

    #headshot { 
      display: inline-block;
      width: 150px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    #info {
      color: ${Colors.white};
      flex-grow: 10;

      #top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        background: ${Colors.headerColor};
        padding: 10px;

        #ticker { 
          margin-top: 10px;
          margin-bottom: 10px;
          font-weight: 600;
        }
        #market-price {
          
        }
      }
      #details {
        padding: 5px 20px 0px 20px;

        #name { 
          margin-bottom: 2px;
        }
        #subname {
          font-size: 16px;
          color: ${Colors.lightGray};
        }
        #favorite {
          margin: 20px 0px 20px 0px;
          border: 1px solid ${Colors.white};
          border-radius: 9999px;
          text-align: center;
          font-size: 14px;
          display: flex;
          align-items: center;
          width: 150px;
          justify-content: center;

          &:hover {
            cursor: pointer;
            background: ${Colors.headerColor};
            transition: .1s all;
          }

          svg {
            height: 20px;
            width: 20px;
            vertical-align: middle;
            margin: 5px;
          }
        }
      }
    }
  }
`;


export function useMarketVolume() {
  const { marketInfo } = useMarketContext();
  const [volume, setVolume] = useState(0);
  useEffect(() => {
    const interval = setInterval(function getVolume() {
      if (marketInfo) {
        const marketAddress = marketInfo?.name;
        BonfidaApi.getVolume(marketAddress.replace("/", "")).then((marketVolume) => {
          setVolume((marketVolume && marketVolume[0]) ? marketVolume[0].volumeUsd : 0)});
      }
      return getVolume;
    }(), 10000);
    return () => clearInterval(interval);
  }, [marketInfo]);
  return volume;
}


export function InstrumentInfo() {
  const { marketPrice, percentChange } = useOrderbookData();
  const volume = useMarketVolume();
  const { marketDetails } = useMarketContext();
  const instrument = marketDetails;

  return (
    <StyledInstrument>
      <div id="ticker-info">
        <div id="headshot">
          <img src={instrument.img} alt="headshot"/>
        </div>
        <div id="info">
          <div id="top-row">
            <div id="ticker">
              ${instrument.ticker}
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
          <div id="details">
            <div id="name">{instrument.name}</div>
            <div id="subname">{instrument.subname}</div>
            <div id="favorite">
                <svg className="Icon_icon__2NnUo inline-block mr-1 h-3 w-3 align-baseline PlayerSummary_favoritedDisabled__3-f5T" role="img" aria-label="Favorite Player Button Star" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="currentColor" fillRule="evenodd" d="M4 6L1.649 7.236l.449-2.618L.196 2.764l2.628-.382L4 0l1.176 2.382 2.628.382-1.902 1.854.45 2.618z"></path></svg>
                <span>FAVORITE</span>
            </div>
          </div>
        </div>
      </div>
      <Stats>
        <div className="stat">
          <div className="name">Vol</div>
          <div className="value">{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 5, notation: "compact" }).format(volume)}</div>
        </div>
        <div className="stat">
          <div className="name">P/E</div>
          <div className="value">{(marketPrice / instrument.earningPerShare).toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="name">Mkt Cap</div>
          <div className="value">{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, notation: "compact" }).format(instrument.totalShares * marketPrice)}</div>
        </div>
      </Stats>
      <Bio>
        <div className="content">
            <div>{instrument.bio}</div>
        </div>
      </Bio>
    </StyledInstrument>
  );
}
