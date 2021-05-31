import React from 'react';

export default class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    )
  }
}