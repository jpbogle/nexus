import React from 'react';
import styled from 'styled-components';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Colors from 'common/colors';
import { ConnectionProvider } from './Connection';
import { MarketProvider } from './Market';
import { OrderbookData } from './Orderbook';
import { RecentTrades } from './RecentTrades';
import { InstrumentInfo } from './Instrument';
import { ExecuteTrade } from './ExecuteTrade';

const Header = styled.div`
  width: 96%;
  height: 40px;
  position: sticky;
  // background: ${Colors.darkBlue};
  color: ${Colors.white};
  padding: 10px 2%;
  display: flex;
  align-items: center;
  justify-content: left;

  #left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #logo {
    height: 30px;
  }
`;

const Search = styled.div`
  border: 1px solid ${Colors.lightGray};
  border-radius: 4px;
  margin-left: 40px;
  padding: 4px 8px 4px 8px;
  display: flex;
  align-items: center;
  width: 20vw;
  min-width: 180px;

  svg {
    height: 100%;
    fill: ${Colors.lightGray};
  }
  input {
    width: 100%;
    color: ${Colors.lightGray};
    padding-left: 5px;
    background: none;
    border: none;
    outline: none;
  }
`;

const Dashboard = styled.div`
  display: flex;
  flex-wrap: wrap-reverse;

  #dashboard {
    justify-content: center;
    flex-grow: 1;

    .flex-row {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      flex-wrap: wrap;
    }
  }

  #side-nav {
    width: 350px;
    display: flex;
    justify-content: center;

    @media (max-width: 1024px) {
      width: 100%;
      position: relative;
    }

    #sticky-side {
      position: fixed;
      width: 350px;
      right: 0;
      display: flex;
      flex-direction: column;
      @media (max-width: 1024px) {
        width: 100%;
        position: relative;
      }
    }
  }
`;

const TradingInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  #graph {
    flex-grow: 4;
    margin: 5px;
    min-width: 50%;
    min-height: 500px;
  }

  .col2 {
    min-width: 300px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
`;

const News = styled.div`
  flex-grow: 1;
  max-width: 500px;
  margin: 5px;

  .news-index {
    padding: 8px;
    position: absolute;
    right: 10px;
    top: 10px;
    text-align: center;
    background: ${Colors.headerColor};
    border-radius: 50%;
    &:hover {
      transform: scale(1.04);
    }
  }

  .news-item {
    color: ${Colors.white};
    border: ${Colors.border};
    background: ${Colors.darkBlue};
    min-width: 300px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    &:hover {
      cursor: pointer;
    }

    .title {
      font-size: 16px;
      font-weight: 600;
      max-width: calc(100% - 40px)
    }
    .date {
      color: ${Colors.lightGray};
      margin: 10px 0px 10px 0px;
    }

    .content {
      font-size: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .link {
      color: ${Colors.white};
      text-decoration: none;
      margin-top: 10px;
      padding: 5px;
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
      }
    }

    .source {
      img {
        max-height: 10px;
      }
    }
  }
`;

const OrderHistory = styled.div`
  height: 130px;
  overflow: scroll;
  margin: 5px;
  color: ${Colors.white};
  background: ${Colors.darkBlue};
  border: ${Colors.border};
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont;
  flex-grow: 3;
  min-width: 300px;

  .header {
    color: ${Colors.lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 8px;
    border-bottom: ${Colors.border};
    ;
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
    text-align: center;
    padding-top: 10px;
    color: ${Colors.lightGray};

  }
`;

const newsUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/nfl/news';

class Trading extends React.Component<{}, {
  newsIndex: number,
  newsData?: {items?: {title: string, pubDate: string, content: string, link: string}[]},
}> {
  constructor(props) {
    super(props);
    this.state = {
      newsIndex: 0,
    };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    fetch(newsUrl)
      .then(res => res.json())
      .then(newsData => {
        console.log(newsData);
        this.setState({
          newsData,
        })
      })
  }
  
  render() {
    const { newsData, newsIndex } = this.state;
    return (
      <>
        <Header>
          <div id="left">
            <img id="logo" src="assets/logo_titled_white.png" alt="NEXUS" />
            <Search id="search">
              <svg fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071 20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z" fill="var(--rh__text-color)" fillRule="evenodd"></path></svg>
              <input placeholder="Search"></input>
            </Search>
          </div>
        </Header>
        <Dashboard>
          <ConnectionProvider>
            <MarketProvider>
              <div id="dashboard">
                <TradingInfo>
                  <div id="graph" className="col1">
                    <TradingViewWidget
                      symbol="BINANCE:SRMUSDT"
                      theme={Themes.DARK}
                      allow_symbol_change={false}
                      hide_legend={true}
                      autosize
                    /> 
                  </div>
                  <div className="col2">
                    <OrderbookData />
                    <RecentTrades />
                  </div>
                </TradingInfo>
                <div className="flex-row">
                  <News>
                    {newsData && newsData.items.map((item, i) => (
                      <div
                        className="news-item"
                        style={{ display: newsIndex !== i ? 'none' : 'block' }}
                        onClick={() => { this.setState({ newsIndex: newsIndex + 1 < newsData.items.length ? newsIndex + 1 : 0})}}
                      >
                        <div className="news-index"><sup>{newsIndex + 1}</sup>&frasl;<sub>{newsData.items.length}</sub></div>
                        <div className="info">
                          <div className="title">{item.title}</div>
                          <div className="date">{new Date(item.pubDate).toDateString()}</div>
                          {item.content !== "null" && <div className="content">{item.content}</div>}
                        </div>
                        <div className="row">
                          <a className="link" href={item.link}>Learn More</a>
                          <div className="source" ><img src="assets/espn.png" alt="espn" /></div>
                        </div>
                      </div>
                    ))}
                  </News>  
                  <OrderHistory>
                    <div className="row header">
                      <div>Type</div>
                      <div>Price (USD)</div>
                      <div>Size</div>
                      <div>Time</div>
                    </div>
                    <div id="orders">
                      No pending orders
                    </div>
                  </OrderHistory>
                </div>
              </div>
              <div id="side-nav">
                <div id="sticky-side">
                  <InstrumentInfo />
                  <ExecuteTrade />
                </div>
              </div>
            </MarketProvider>
          </ConnectionProvider>
        </Dashboard>
      </>
    );
  }
}

export default Trading;