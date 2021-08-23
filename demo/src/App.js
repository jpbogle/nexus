import React from 'react';
import styled from 'styled-components';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const green = "rgb(65, 199, 122)";
const red = "rgb(242, 59, 105)";
const border = "1px solid rgb(64,73,78)";
// const darkBlue = "hsla(0,0%,100%,.08)";
const darkBlue = "rgb(26, 32, 41)";
const lightGray = "rgba(255,255,255,0.6)";
const white = "hsla(0,0%,100%,.85)";
const headerColor = "hsla(0,0%,100%,.08)";

const Header = styled.div`
  width: 96%;
  height: 40px;
  position: sticky;
  // background: ${darkBlue};
  color: ${white};
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
  border: 1px solid ${lightGray};
  border-radius: 4px;
  margin-left: 40px;
  padding: 4px 8px 4px 8px;
  display: flex;
  align-items: center;
  width: 20vw;
  min-width: 180px;

  svg {
    height: 100%;
    fill: ${lightGray};
  }
  input {
    width: 100%;
    color: ${lightGray};
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

const Instrument = styled.div`
  border: ${border};
  background: ${darkBlue};
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
      color: ${white};
      flex-grow: 10;

      #top-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
        background: ${headerColor};
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

          &:hover {
            cursor: pointer;
            background: ${headerColor};
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

const Bio = styled.div`
  padding: 10px 15px;
  color: ${lightGray};
  overflow: scroll;
  display: flex;
  justify-content: center;
  
  .content {
    line-height: 1.6;
    font-size: 14px;
  }
`;

const Trade = styled.div`
  color: ${white};
  border-radius: 10px;
  overflow: hidden;
  background: ${darkBlue};
  margin: 5px;
  border: 1px solid rgb(64,73,78);
  
  .title {
    padding: 10px 25px;
    background: ${headerColor};
    width: 100%:
  }
  
  .line-item {
    display: flex;
    margin: 10px 25px;
    align-items: center;
    justify-content: space-between;
  }

  input {
    border: ${border};
    border-radius: 4px;    
    color: ${white};
    padding: 6px;
    text-align: right;
    background: none;
    outline: none;
    width: 82px;
  }

  #total {
    margin-top 20px;
    padding-top: 10px;
    border-top: ${border};
  }

  .execute {
    background: hsla(0,0%,100%,.2);
    padding: 6px;
    border: 1px solid white;
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
      background: ${headerColor};
      transition: .1s all;
    }
  }

`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${white};
  text-align: right;
  padding: 12px 0px 12px 0px;
  background: ${headerColor};
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
      color: ${lightGray};
    }
  }
`;

const OrderBook = styled.div`
  color: ${white};
  background: ${darkBlue};
  border: ${border};
  padding: 20px;
  margin: 5px;

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
    padding: 8px;
    font-family: -apple-system,BlinkMacSystemFont;

    #arrow { 
      margin-left: 5px;
    }
  }

  #buys {
    font-family: -apple-system,BlinkMacSystemFont;
    font-size: 14px;
  }

  #sells {
    font-family: -apple-system,BlinkMacSystemFont;
    font-size: 14px;
    display: flex;
    flex-direction: column-reverse;
  }

  .order {
    display: flex;
    justify-content: space-between;
    margin: 1px;
    padding: 1px;
    position: relative;
    .bar {
      right: 0;
      position: absolute;
      height: 100%;
      z-index: 0;
    }
    .price {
      z-index: 1;
    }
  }

  .buy-order {
    .price {
      color: ${green};
    }
    .bar {
      background: rgba(2, 199, 122, 0.25);
    }
  }

  .sell-order {
    .price {
      color: ${red};
    }
    .bar {
      background: rgba(255, 59, 105, 0.25);
    }
  }
`;

const Recents = styled.div`
  height: 130px;
  overflow: scroll;
  margin: 5px;
  color: ${white};
  background: ${darkBlue};
  border: ${border};
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont;

  .header {
    color: ${lightGray};
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
    background: ${headerColor};
    border-radius: 50%;
    &:hover {
      transform: scale(1.04);
    }
  }

  .news-item {
    color: ${white};
    border: ${border};
    background: ${darkBlue};
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
      &:hover {
        cursor: pointer;
        background: ${headerColor};
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
  color: ${white};
  background: ${darkBlue};
  border: ${border};
  padding: 20px;
  font-family: -apple-system,BlinkMacSystemFont;
  flex-grow: 3;
  min-width: 300px;

  .header {
    color: ${lightGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 8px;
    border-bottom: ${border};
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
    color: ${lightGray};

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
    subname: "Carolina Panthers | RB | #22",
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
  return { price: marketPrice, type, quantity, timestamp: new Date() };
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
      newsIndex: 0,
      numShares: 0,
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
    const { buys, sells, recentOrders, marketPrice, percentMove, instrument, volume, newsData, newsIndex, numShares} = this.state;
    const topBuys = buys.slice(0, 8);
    const topSells = sells.slice(0, 8);

    const buyOrders = topBuys.map(({price, quantity, type}) => (
      <div className="buy-order order">
        {/* backgroundImage: linear-gradient(to right, rgba(255, 59, 105, 0.25), rgba(255, 59, 105, 0.25) 54%, rgba(0, 0, 0, 0) 54%)" */}
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price">${price.toFixed(2)}</div>
        <div className="bar" style={{ width: `${((marketPrice - price) * 400 / marketPrice)}%` }}/>
      </div>
    ));

    const sellOrders = topSells.map(({price, quantity, type}) => (
      <div className="sell-order order">
        {/* backgroundImage: `linear-gradient(to left, rgba(2, 199, 122, 0.25), rgba(2, 199, 122, 0.25) ${((price - marketPrice) * 100 / marketPrice)}%, rgba(0, 0, 0, 0) ${((price - marketPrice) * 100 / marketPrice)}%)` */}
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price">${price.toFixed(2)}</div>
        <div className="bar" style={{ width: `${((price -  marketPrice) * 400 / marketPrice)}%` }}/>
      </div>
    ));

    const recents = recentOrders.map(({price, quantity, type, timestamp}) => (
      <div className="row">
        <div className="price" style={{ color: type === "BUY" ? green : red }}>${price.toFixed(2)}</div>
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="time">{timestamp.toLocaleTimeString(navigator.language, {hour: 'numeric', minute:'numeric', second:'numeric'})}</div>
      </div>
    ));


    return (
      <>
        <Header>
          <div id="left">
            <img id="logo" src="./logo_titled_white.png" alt="NEXUS" />
            <Search id="search">
              <svg fill="none" height="24" role="img" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071 20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629 7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z" fill="var(--rh__text-color)" fill-rule="evenodd"></path></svg>
              <input placeholder="Search"></input>
            </Search>
          </div>
        </Header>
        <Dashboard>
          <div id="dashboard">
            <TradingInfo>
              <div id="graph" class="col1">
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
            </TradingInfo>
            <div class="flex-row">
              <News>
                {newsData && newsData.items.map((item, i) => (
                  <div
                    class="news-item"
                    style={{ display: newsIndex !== i ? 'none' : 'block' }}
                    onClick={() => { this.setState({ newsIndex: newsIndex + 1 < newsData.items.length ? newsIndex + 1 : 0})}}
                  >
                    <div class="news-index"><sup>{newsIndex + 1}</sup>&frasl;<sub>{newsData.items.length}</sub></div>
                    <div class="info">
                      <div class="title">{item.title}</div>
                      <div class="date">{new Date(item.pubDate).toDateString()}</div>
                      {item.content !== "null" && <div class="content">{item.content}</div>}
                    </div>
                    <div class="row">
                      <a class="link" href={item.link}>Learn More</a>
                      <div class="source" ><img src="./espn.png" alt="espn" /></div>
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
                      <div>Brian "Smash" Williams is a fictional character in the NBC/DirecTV(The 101 Network) drama television series Friday Night Lights portrayed by actor Gaius Charles. He is the starting running back of the Dillon High School Panthers. Considered the most talented player on the roster after quarterback Jason Street, Smash received his nickname from his father after hitting a water heater. Smash is believed to be based on Boobie Miles from the Friday Night Lights book and film.</div>
                      {/* <p>Williams is shown to be a jock in the beginning of the show. He starts a feud with fullback Tim Riggins, after having sex with Riggins' girlfriend Tyra Collette. After being caught taking performance-enhancing drugs, Smash begins a more mature approach to life, taking QB Matt Saracen under his wing, building a friendship with Riggins and leading the team after the devastating injury to Jason Street</p> */}
                  </div>
                </Bio>
              </Instrument>
              <Trade>
                <div class="title">Buy {instrument.ticker}</div>
                <div class="line-item">
                  <div class="key">Shares</div>
                  <div class="value"><input placeholder="Shares" onChange={(e) => this.setState({numShares: e.target.value})}/></div>
                </div>
                <div class="line-item">
                  <div class="key">Price</div>
                  <div class="value">${marketPrice.toFixed(2)}</div>
                </div>
                <div class="line-item" id="total">
                  <div class="key">Total</div>
                  <div class="value">${(marketPrice * numShares).toFixed(2)}</div>
                </div>
                <span class="execute">
                  Coming Soon
                </span>
              </Trade>
            </div>
          </div>
        </Dashboard>
      </>
    );
  }
}

export default App;
