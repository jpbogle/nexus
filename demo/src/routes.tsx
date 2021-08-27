import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trading from './trading/Trading';
import Fundraising from './fundraising/Fundraising';

export default function Routes() {
  return (
    <>
      <BrowserRouter basename={'/'}>
        <Switch>
          <Route exact path="/" component={Trading} />
          <Route exact path="/fundraise" component={Fundraising} />
        </Switch>
      </BrowserRouter>
    </>
  );
}