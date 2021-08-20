import React from 'react';
import styled from 'styled-components';
import { createChart } from 'lightweight-charts';

const green = "rgb(65, 199, 122)";
const red = "rgb(242, 59, 105)";
// const border = "5px solid rgba(0, 0, 0, .3)";
const border = "";
const gray = "rgba(0,0,0,0.3)";
const darkBlue = "rgb(26, 32, 41)";
const teal = "rgba(38,198,218, 1)";
const lightGray = "rgba(255,255,255,0.6)";

const Header = styled.div`
  height: 60px;
  background: ${darkBlue};
  color: white;
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
      color: white;
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
  #right-panel {
    min-width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const ExecutedTrades = styled.div`
  height: calc(100vh - 80px);
  width: calc(100vw - 390px);
  min-width: 340px;
  margin: 10px 0px 10px 10px;
`;

const Instrument = styled.div`
  border: ${border};
  background: ${darkBlue};


  #ticker-info {
    height: 200px;
    display: flex;
    flex-grow: 1;

    #headshot { 
      display: inline-block;
      height: 100%;

      img {
        height: 100%;
      }
    }
    #info {
      flex-grow: 1;
      color: white;
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
          margin-top: 20px;
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

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
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
  background: ${darkBlue};
  border: ${border};
  color: white;
  padding: 20px;

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

    #arrow { 
      margin-left: 5px;
    }
  }

  #buys {
    font-family: -apple-system,BlinkMacSystemFont;

  }

  #sells {
    font-family: -apple-system,BlinkMacSystemFont;

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
    const marketPrice = 50;
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
      instrument: instruments[1]
    };
    this.chartRef = React.createRef();
    this.addOrder = this.addOrder.bind(this);
  }

  componentDidMount() {
    setInterval(this.addOrder, 100);
    this.chart = createChart(this.chartRef.current, {
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.3,
          bottom: 0.25,
        },
        borderVisible: false,
      },
      layout: {
        backgroundColor: '#131722',
        textColor: '#d1d4dc',
      },
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    });
    this.chartSeries = this.chart.addAreaSeries({
      topColor: 'rgba(38,198,218, 0.6)',
      bottomColor: 'rgba(38,198,218, 0.05)',
      lineColor: 'rgba(38,198,218, 1)',
      lineWidth: 2,
    });
  }

  addOrder() {
    let { buys, sells, volume, marketPrice, bias} = this.state;
    const order = generateMarketOrder(bias, buys, sells, 5, 15);
    console.log(order);
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
    
    this.chartSeries.update({
      value: order.price,
      time: Date.now(),
    });
    this.setState({
      buys,
      sells,
      marketPrice: order.price,
      percentMove: (order.price - marketPrice) / marketPrice,
      volume: volume + quantityTraded,
    });
  }
  
  render() {
    const { buys, sells, bias, marketPrice, percentMove, instrument, volume } = this.state;
    const topBuys = buys.slice(0, 10);
    const topSells = sells.slice(0, 10);

    const buyOrders = topBuys.map(({price, quantity, type}) => (
      <div className="buy-order order">
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
    ));

    const sellOrders = topSells.map(({price, quantity, type}) => (
      <div className="sell-order order">
        <div className="quantity">{quantity.toFixed(2)}</div>
        <div className="price">${price.toFixed(2)}</div>
      </div>
    ));


    return (
      <>
        <Header>
          <div id="center">
            <div id="title"><img src="./logo_titled_white.png" alt="NEXUS" /></div>
            {/* <div class="input" style={{opacity: 0}}>
              <div>Bias</div>
              <input value={bias} onChange={(e) => this.setState({ bias: e.target.value })}></input>
            </div> */}
          </div>
        </Header>
        <Dashboard>
          <ExecutedTrades ref={this.chartRef} />
          <div id="right-panel">
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
            </Instrument>
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
        </Dashboard>
      </>
    );
  }
}

export default App;
