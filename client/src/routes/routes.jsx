import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Auth from '@/components/Auth/index.jsx';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todo" exact>
          <div>TODO</div>
        </Route>
        <Redirect to="/todo" exact/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}