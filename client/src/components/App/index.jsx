import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './index.scss';

import { useRoutes } from '@/routes/routes.jsx';


export default class App extends React.Component {
  render() {
    const routes = useRoutes(true);
    return (
      <Router>
        {routes}
      </Router>
    )
  }
}