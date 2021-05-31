import React from 'react';
import './index.scss';

import LinksToFrom from '@/components/LinksToForm/index.jsx';

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formRegister = document.forms.register;

    // registerFormLogin
    // registerFormPassword
    // registerFormSecret
  }

  render() {
    return (
      <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center full-height">
        <div className="col-xl-3 col-lg-4 col-md-6 col-12 d-flex justify-content-center align-items-center full-height flex-column">
          <LinksToFrom></LinksToFrom>
          <form className="register-form" name="register" method="POST" onSubmit={this.handleSubmit}>
            <div>
              <label for="register-form__login">Логин:</label>
              <input type="text" id="register-form__login" name="registerFormLogin" />
            </div>
            <div>
              <label for="register-form__password">Пароль:</label>
              <input type="text" id="register-form__password" name="registerFormPassword" />
            </div>
            <div>
              <label for="register-form__secret">Кодовое слово:</label>
              <input type="text" id="register-form__secret" name="registerFormSecret" />
            </div>
            <div><input type="submit" value="Зарегистрироваться" /></div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}