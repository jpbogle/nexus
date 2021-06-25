import React from 'react';
import styled from 'styled-components';
import { createChart } from 'lightweight-charts';

const green = "rgb(65, 199, 122)";
const red = "rgb(242, 59, 105)";
const border = "5px solid rgba(0, 0, 0, .3)";
const gray = "rgba(0,0,0,0.3)";
const darkBlue = "#131722";
const teal = "rgba(38,198,218, 1)";
const lightGray = "rgba(255,255,255,0.6)";

const Header = styled.div`
  height: 40px;
  background: ${darkBlue};
  color: white;
  padding: 10px 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${gray};

  #right {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  #title {
    font-size: 30px;
    i {
      margin-right: 12px;
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
    margin: 10px;
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
  height: 150px;
  display: flex;
  margin-bottom: 10px;
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
    padding: 10px 20px;
    color: white;
    #name { 
      margin-bottom: 2px;
    }
    #ticker { 
      color: ${lightGray};
      margin-bottom: 20px;
    }
    #stats {
      text-align: right;
      .stat {
        .value {
          width: 70px;
          color: ${lightGray};
        }
        div {
          display: inline-block;
        }
      }
    }

  }
`;

const OrderBook = styled.div`
  background: ${darkBlue};
  border: ${border};
  color: white;
  padding: 10px;

  .title {
    text-align: center;
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: .1px solid ${lightGray};
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
  }

  #sells {
    display: flex;
    flex-direction: column-reverse;
  }

  .order {
    display: flex;
    justify-content: space-between;
    padding: 2px;
    &:nth-child(odd) {
      background: ${gray};
    }
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
      instrument: {
        name: "Matthew Wolff",
        ticker: "WOLFF",
        earningPerShare: 30,
        totalShares: 1000000,
      }
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
    const topBuys = buys.slice(0, 12);
    const topSells = sells.slice(0, 12);

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
          <div id="left">
            <div id="title"><i class="fas fa-spinner" />Nexus</div>
            <div class="input">
              <div>Bias</div>
              <input value={bias} onChange={(e) => this.setState({ bias: e.target.value })}></input>
            </div>
          </div>
          <div id="right">
            <div id="login">Login</div>
          </div>
        </Header>
        <Dashboard>
          <ExecutedTrades ref={this.chartRef} />
          <div id="right-panel">
            <Instrument>
              <div id="headshot">
                <img src='./headshots/mwolff.webp' alt="headshot"/>
              </div>
              <div id="info">
                <div id="name">{instrument.name}</div>
                <div id="ticker">
                  ${instrument.ticker}
                  <div id="market-price" style={{ color: percentMove > 0 ? green : red }}>
                    ${marketPrice.toFixed(2)}
                    {percentMove > 0 ? (
                      <i id="arrow" class="fas fa-arrow-up" />
                    ) : (
                      <i id="arrow" class="fas fa-arrow-down" />
                    )}
                  </div>
                </div>
                <div id="stats">
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
                </div>
              </div>
            </Instrument>
            <OrderBook>
              <div className="title">Order Book</div>
              <div className="header">
                <div>Quantity</div>
                <div>Price</div>
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
          </div>
        </Dashboard>
      </>
    );
  }
}

export default App;
