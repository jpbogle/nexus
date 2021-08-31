import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SerumTrading from 'trading/serum/SerumTrading';
import Fundraising from 'fundraising/Fundraising';

export default function Routes() {
  return (
    <>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path="/" component={SerumTrading} />
          <Route exact path="/fundraise" component={Fundraising} />
        </Switch>
      </BrowserRouter>
    </>
  );
}