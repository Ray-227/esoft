import React from 'react';
import './index.scss';

import Links from '@/components/Links/index.jsx';
import { ContextBuilder } from 'express-validator/src/context-builder';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formLogin = document.forms.login;
    const {
      login,
      password
    } = formLogin;
  }

  render() {
    return (
      <form className="auth-form" name="auth" method="POST" onSubmit={this.handleSubmit}>
        <label>
          <div>Логин:</div>
          <input type="password" name="login" />
        </label>
        <label>
          <div>Пароль:</div>
          <input type="password" name="password" />
        </label>
        <div><input type="submit" value="Вход" /></div>
      </form>
    )
  }
}


// Добавление пользователя
async function CreateUser(
  firstName,
  lastName,
  otherName,
  login,
  password,
  secret,
  isLeader,
  leader,
  team
  ) {
  
  const response = await fetch("/register", {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        otherName,
        login,
        password,
        secret,
        isLeader,
        leader,
        team
      })
  });
  // if (response.ok === true) {
  //     const user = await response.json();
  //     reset();
  //     document.querySelector("tbody").append(row(user));
  // }
}

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {whoIs: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const formRegister = document.forms.register;

    let firstName = formRegister.firstName.value || '';
    let lastName = formRegister.lastName.value || '';
    let otherName = formRegister.otherName.value || '';
    let login = formRegister.login.value || '';
    let password = formRegister.password.value || '';
    let secret = formRegister.secret.value || '';
    let isLeader = formRegister.isLeader.value || '';
    let leader = formRegister.leader.value || '';
    let team = formRegister.team.selectedOptions || false;

    const aTeam = [];
    if(team) {
      Object.keys(team).forEach( key => {
        aTeam.push(team[key].value);
      })
    }

    console.log(aTeam);


    // CreateUser(

    // );
  }

  handleChange(e) {
    if (e.target.value === 'leader') {
      this.setState({whoIs: e.target.value});
    } else if (e.target.value === 'user') {
      this.setState({whoIs: e.target.value});
    }
  }

  render() {
    let whoIt;
    if (this.state.whoIs === 'leader') {
      whoIt = 
      <label>
        <div>Выберите пользователя(-лей):</div>
        <select name='team' multiple>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
          <option>Test</option>
        </select>
      </label>;
    } else if (this.state.whoIs === 'user') {
      whoIt = 
      <label>
        <div>Выберите руководителя:</div>
        <select name='leader'>
          <option>Test</option>
        </select>
      </label>;
    }
    return (
      <form className="register-form" name="register" method="POST" onSubmit={this.handleSubmit}>
        <label>
          <div>Имя:</div>
          <input type="text" name="firstName" />
        </label>
        <label>
          <div>Фамилия:</div>
          <input type="text" name="lastName" />
        </label>
        <label>
          <div>Отчество:</div>
          <input type="text" name="otherName" />
        </label>
        <label>
          <div>Логин:</div>
          <input type="text" name="login" />
        </label>
        <label>
          <div>Пароль:</div>
          <input type="text" name="password" />
        </label>
        <label>
          <div>Секретные код:</div>
          <input type="text" name="secret" />
        </label>
        <label>
          <div>Руководитель:</div>
          <input type="radio" name="whoIs" value="leader" onChange={this.handleChange} />
        </label>
        <label>
          <div>Пользователь:</div>
          <input type="radio" name="whoIs" value="user" onChange={this.handleChange} />
        </label>
        <label>
          <div>Вы руководитель?:</div>
          <input type="checkbox" name="isLeader" value="leader" />
        </label>
        {whoIt}
        <div><input type="submit" value="Зарегистрироваться" /></div>
      </form>
    )
  }
}


export default class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      whatFormAuth: 'login'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.name === 'register') {
      this.setState({whatFormAuth: e.target.name});
    } else if (e.target.name === 'login') {
      this.setState({whatFormAuth: e.target.name});
    }
  }

  componentDidMount() {
    this.diabledButton();
  }

  diabledButton() {
    const authButtons = document.querySelector('.auth-buttons');

    if (authButtons) {
      if (this.state.whatFormAuth === 'register') {
        authButtons.firstChild.setAttribute('disabled', '');
        authButtons.lastChild.removeAttribute('disabled', '');
      } else if (this.state.whatFormAuth === 'login') {
        authButtons.lastChild.setAttribute('disabled', '');
        authButtons.firstChild.removeAttribute('disabled', '');
      }
    }
  }

  render() {
    let whatFormAuth;
    if (this.state.whatFormAuth === 'register') {
      whatFormAuth = <Registration />;
      this.diabledButton();
    } else if (this.state.whatFormAuth === 'login') {
      whatFormAuth = <Login />;
      this.diabledButton();
    }
    return (
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center full-height">
          <div className="col-xl-3 col-lg-4 col-md-6 col-12 d-flex justify-content-center align-items-center full-height flex-column">
          {whatFormAuth}
          <div className="auth-buttons">
            <button onClick={this.handleClick} name="register">Регистрация</button>
            <button onClick={this.handleClick} name="login">Авторизация</button>
          </div>
          </div>
        </div>
      </div>
    )
  }
}