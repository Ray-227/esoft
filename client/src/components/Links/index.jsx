import React from 'react';
import './index.scss';

export default class Links extends React.Component {
  render() {
    return (
      <div className="link-form">
        <a href="/auth/login">Авторизация</a>
        <a href="/auth/registration">Регистрация</a>
      </div>
    )
  }
}


