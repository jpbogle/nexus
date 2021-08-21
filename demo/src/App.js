import React from 'react';
import styled from 'styled-components';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const green = "rgb(65, 199, 122)";
const red = "rgb(242, 59, 105)";
// const border = "5px solid rgba(0, 0, 0, .3)";
const border = "";
const gray = "rgba(0,0,0,0.3)";
const darkBlue = "rgb(26, 32, 41)";
const teal = "rgba(38,198,218, 1)";
const lightGray = "rgba(255,255,255,0.6)";
const white = "hsla(0,0%,100%,.85)";

const Header = styled.div`
  height: 60px;
  background: ${darkBlue};
  color: ${white};
  padding: 10px 2%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${gray};


  #left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #title {
    font-size: 30px;
    img {
      margin-right: 12px;
      height: 50px;
    }
  }

  #login {
    border: 1px solid ${teal};
    background: rgba(38,198,218, .1);
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      transition: .1s all;
      background: rgba(38,198,218, .2);
    }
  }

  .input {
    margin: 0px 20px;
    display: flex;
    align-items: center;
    div {
      display: inline-block;
      color: black;
      background-color: ${lightGray};
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      padding: 6px 10px;
      width: 30px;
      text-align: right;
    }
    input {
      padding: 7px 10px;
      width: 30px;
      background: rgba(255,255,255,0.1);
      color: ${white};
      border: 1px solid ${lightGray};
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;

const Dashboard = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap-reverse;

  .col1 {
    flex-grow: 10;
  }

  .col2 {
    width: 100%;
    max-width: 400px;
  }

  .col3 {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Instrument = styled.div`
  border: ${border};
  background: ${darkBlue};


  #ticker-info {
    display: flex;

    #headshot { 
      display: inline-block;
      width: 180px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    #info {
      color: ${white};
      font-size: 20px;

      #top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        background: hsla(0,0%,100%,.08);
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
          color: ${lightGray};
        }
        #favorite {
          margin: 20px 0px 20px 0px;
          border: 1px solid white;
          border-radius: 9999px;
          text-align: center;
          font-size: 14px;
          display: flex;
          align-items: center;
          width: 150px;
          justify-content: center;

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

const Bio = styled.div`
  padding: 20px;
  color: ${lightGray};
  overflow: scroll;
  display: flex;
  justify-content: center;
  
  .content {
    width: 450px;
    line-height: 1.6;
  }
  
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${white};
  text-align: right;
  padding: 16px 0px 16px 0px;
  background: hsla(0,0%,100%,.08);

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
      color: ${lightGray};
    }
  }
`;

const OrderBook = styled.div`
  color: ${white};
  background: ${darkBlue};
  border: ${border};
  padding: 20px;
  margin: 0px 10px 10px 10px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  .header {
    color: ${lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 8px;
  }

  #spread {

    display: flex;
    justify-content: space-between;
    text-align: right;
    padding: 10px;
    font-family: -apple-system,BlinkMacSystemFont;
    font-size: 16px;

    #arrow { 
      margin-left: 5px;
    }
  }

  #buys {
    font-family: -apple-system,BlinkMacSystemFont;
    font-wieght: 200;
    font-size: 14px;
  }

  #sells {
    font-family: -apple-system,BlinkMacSystemFont;
    font-wieght: 200;
    font-size: 14px;
    
    display: flex;
    flex-direction: column-reverse;
  }

  .order {
    display: flex;
    justify-content: space-between;
    padding: 2px;

  }

  .buy-order {
    .price {
      color: ${green};
    }
  }

  .sell-order {
    .price {
      color: ${red};
    }
  }
`;

const Recents = styled.div`
  height: 200px;
  overflow: scroll;
  margin: 0px 10px;
  color: ${white};
  background: ${darkBlue};
  border: ${border};
  padding: 20px;

  .header {
    color: ${lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 8px;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

`;

const News = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: scroll;

  .news-item {
    border: 1px solid #434651;
    width: 20%;
    min-width: 300px;
    color: ${white};
    padding: 20px;
    background: hsla(0,0%,100%,.08);
    border-radius: 10px;
    margin: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 16px;
      font-weight: 600;
    }
    .date {
      color: ${lightGray};
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
      color: ${white};
      text-decoration: none;
      margin-top: 10px;
      padding: 5px;
      border: 1px solid white;
      border-radius: 9999px;
      text-align: center;
      font-size: 14px;
      display: flex;
      align-items: center;
      width: 150px;
      justify-content: center;
    }
    .source {
      img {
        max-height: 10px;
      }
    }
  }
`;

const instruments = [
  {
    name: "Matthew Wolff",
    ticker: "WOLFF",
    earningPerShare: 30,
    totalShares: 1000000,
    img: './headshots/mwolff.webp',
  },
  {
    name: "Brian 'SMASH' Williams",
    subname: "Carolina Panthers | Running Back | #22",
    ticker: "SMASH",
    earningPerShare: 30,
    totalShares: 1000000,
    img: './headshots/smash.png',
  },
]

const newsUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://www.espn.com/espn/rss/nfl/news';

function generateMarketOrder(bias, buys, sells, minQuantity, maxQuantity) {
  const type = Math.random() > bias ? 'SELL' : 'BUY';
  let marketPrice = 50;
  if (type === 'BUY' && sells.length > 0) {
    marketPrice = sells[0].price
  } else if (buys.length > 0) {
    marketPrice = buys[0].price;
  }
  const quantity = (Math.random() * (minQuantity + maxQuantity)) + minQuantity;
  return { price: marketPrice, type, quantity };
}

function generateLimitOrder(marketPrice, minQuantity, maxQuantity) {
  const rand = Math.random() * marketPrice * 2;
  const type = rand > marketPrice ? 'SELL' : 'BUY';
  const price = rand;
  const quantity = (Math.random() * (minQuantity + maxQuantity)) + minQuantity;
  return { price, type, quantity };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const buys = [];
    const sells = [];
    const marketPrice = 150;
    for (let i = 0; i <= 1000; i++) {
      const order = generateLimitOrder(marketPrice, 40, 80);
      if (order.type === 'BUY') {
        buys.push(order)
      } else {
        sells.push(order)
      }
    }

    buys.sort((a, b) => (a.price < b.price ? 1 : -1));
    sells.sort((a, b) => (a.price > b.price ? 1 : -1));
    this.state = {
      bias: .5,
      buys,
      sells,
      marketPrice: sells[0].price,
      percentMove: 0,
      volume: 100000,
      instrument: instruments[1],
      recentOrders: [],
    };
    this.addOrder = this.addOrder.bind(this);
  }

  componentDidMount() {
    setInterval(this.addOrder, 1000);
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

  addOrder() {
    let { buys, sells, volume, marketPrice, bias, recentOrders } = this.state;
    const order = generateMarketOrder(bias, buys, sells, 5, 15);
    if (order.type === 'BUY') {
      buys.push(order)
      buys.sort((a, b) => (a.price < b.price ? 1 : -1));
    } else {
      sells.push(order)
      sells.sort((a, b) => (a.price > b.price ? 1 : -1));
    }

    let quantityTraded = 0;
    while (buys.length > 0 && sells.length > 0 && buys[0].price >= sells[0].price) {
      if (buys[0].quantity > sells[0].quantity) {
        buys[0].quantity -= sells[0].quantity;
        quantityTraded += sells[0].quantity
        sells.shift();
      } else if (sells[0].quantity > buys[0].quantity) {
        sells[0].quantity -= buys[0].quantity
        quantityTraded += buys[0].quantity
        buys.shift();
      } else {
        quantityTraded += buys[0].quantity
        buys.shift();
        sells.shift();
      } 
    }
    
    this.setState({
      buys,
      sells,
      recentOrders: [order, ...recentOrders.slice(0, 30)],
      marketPrice: order.price,
      percentMove: (order.price - marketPrice) / marketPrice,
      volume: volume + quantityTraded,
    });
  }
  
  render() {
    const { buys, sells, recentOrders, marketPrice, percentMove, instrument, volume, newsData } = this.state;
    const topBuys = buys.slice(0, 10);
    const topSells = sells.slice(0, 10);

    const buyOrders = topBuys.map(({price, quantity, type}) => (
      <div className="buy-order order">
        <div className="quantity">
          {quantity.toFixed(2)}
        </div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
    ));

    const sellOrders = topSells.map(({price, quantity, type}) => (
      <div className="sell-order order">
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
    ));

    const recents = recentOrders.map(({price, quantity, type}) => (
      <div className="row">
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price" style={{ color: type === "BUY" ? green : red }}>${price.toFixed(2)}</div>
      </div>
    ));


    return (
      <>
        <Header>
          <div id="left">
            <div id="title"><img src="./logo_titled_white.png" alt="NEXUS" /></div>
          </div>
        </Header>
        <Dashboard>
          <div id="trading-view" class="col1">
            <TradingViewWidget
              symbol="NASDAQ:AAPL"
              theme={Themes.DARK}
              allow_symbol_change={false}
              hide_legend={true}
              autosize
            />    
          </div>
          <div class="col2">
            <OrderBook>
              <div className="header">
                <div>Size</div>
                <div>Price (USD)</div>
              </div>
              <div id="sells">
                {sellOrders}
              </div>
              <div id="spread" style={{ background: percentMove > 0 ? "rgb(65, 199, 122, 0.06)" : "rgba(242, 59, 105, 0.06)" }}>
                <div id="percent-move" style={{ color: percentMove > 0 ? green : red }}>
                  {(percentMove * 100).toFixed(2)}%
                </div>
                <div id="market-price" style={{ color: percentMove > 0 ? green : red }}>
                  ${marketPrice.toFixed(2)}
                  {percentMove > 0 ? (
                    <i id="arrow" class="fas fa-arrow-up" />
                  ) : (
                    <i id="arrow" class="fas fa-arrow-down" />
                  )}
                </div>
              </div>
              <div id="buys">
                {buyOrders}
              </div>
            </OrderBook>
            <Recents>
              <div className="row header">
                <div>Price (USD)</div>
                <div>Size</div>
                <div>Time</div>
              </div>
              <div id="orders">
                {recents}
              </div>
            </Recents>
          </div>
          <div class="col3">
            <Instrument>
              <div id="ticker-info">
                <div id="headshot">
                  <img src={instrument.img} alt="headshot"/>
                </div>
                <div id="info">
                  <div id="top-row">
                    <div id="ticker">
                      ${instrument.ticker}
                    </div>
                    <div id="market-price" style={{ color: percentMove > 0 ? green : red }}>
                      ${marketPrice.toFixed(2)}
                      {percentMove > 0 ? (
                        <i id="arrow" class="fas fa-arrow-up" />
                      ) : (
                        <i id="arrow" class="fas fa-arrow-down" />
                      )}
                    </div>
                  </div>
                  <div id="details">
                    <div id="name">{instrument.name}</div>
                    <div id="subname">{instrument.subname}</div>
                    <div id="favorite">
                        <svg class="Icon_icon__2NnUo inline-block mr-1 h-3 w-3 align-baseline PlayerSummary_favoritedDisabled__3-f5T" role="img" aria-label="Favorite Player Button Star" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path fill="currentColor" fill-rule="evenodd" d="M4 6L1.649 7.236l.449-2.618L.196 2.764l2.628-.382L4 0l1.176 2.382 2.628.382-1.902 1.854.45 2.618z"></path></svg>
                        <span>FAVORITE</span>
                    </div>
                  </div>
                </div>
              </div>
              <Stats>
                <div class="stat">
                  <div class="name">Vol</div>
                  <div class="value">{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 5, notation: "compact" }).format(volume)}</div>
                </div>
                <div class="stat">
                  <div class="name">P/E</div>
                  <div class="value">{(marketPrice / instrument.earningPerShare).toFixed(2)}</div>
                </div>
                <div class="stat">
                  <div class="name">Mkt Cap</div>
                  <div class="value">{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, notation: "compact" }).format(instrument.totalShares * marketPrice)}</div>
                </div>
              </Stats>
              <Bio>
                <div class="content">
                  Apple, Inc engages in the design, manufacture, and sale of smartphones, personal computers, tablets, wearables and accessories, and other variety of related services. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific. The Americas segment includes North and South America. The Europe segment consists of European countries, as well as India, the Middle East, and Africa. The Greater China segment comprises of China, Hong Kong, and Taiwan. The Rest of Asia Pacific segment includes Australia and Asian countries. Its products and services include iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, Apple Care, iCloud, digital content stores, streaming, and licensing services. The company was founded by Steven Paul Jobs, Ronald Gerald Wayne, and Stephen G. Wozniak in 1977 and is headquartered in Cupertino, CA.
                </div>
              </Bio>
            </Instrument>
            <Stats>
                <div class="stat">
                  <div class="name">GP</div>
                  <div class="value">9</div>
                </div>
                <div class="stat">
                  <div class="name">Rushing Yards</div>
                  <div class="value">742</div>
                </div>
                <div class="stat">
                  <div class="name">Receiving Yards</div>
                  <div class="value">313</div>
                </div>
                <div class="stat">
                  <div class="name">TDs</div>
                  <div class="value">5</div>
                </div>
              </Stats>
          </div>
          <News>
            {newsData && newsData.items.map(i => (
              <div class="news-item">
                <div class="info">
                  <div class="title">{i.title}</div>
                  <div class="date">{new Date(i.pubDate).toDateString()}</div>
                  <div class="content">{i.content}</div>
                </div>
                <div class="row">
                  <a class="link" href={i.link}>Learn More</a>
                  <div class="source" ><img src="./espn.png" alt="espn" /></div>
                </div>
              </div>
            ))}
          </News>
        </Dashboard>
      </>
    );
  }
}

export default App;
