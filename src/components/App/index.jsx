import React, { Fragment } from 'react';
import './index.scss';

import Todo from '@/components/Todo/index.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Todo></Todo>
      </Fragment>
    )
  }
}