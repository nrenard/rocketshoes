import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const lazyDefault = page => lazy(() => import('./pages/' + page));

export default function App() {
  return (
    <Switch>
      <Suspense fallback={<p>Loading...</p>}>
        <Route exact path="/" component={lazyDefault('Home')} />
        <Route exact path="/cart" component={lazyDefault('Cart')} />
      </Suspense>
    </Switch>
  );
}
