import React, { Fragment } from 'react';
import './index.scss';


export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formCreate: 'close',
      isAdmin: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {
    if(e.target.className.includes('menu__createBtn')) {
      const formCreate = e.target.parentNode.parentNode.querySelector('.todo__form-create');

      if(this.state.formCreate === 'close') {
        formCreate.style.display = 'block';
        this.setState({formCreate: 'open'});
      }
    }

    if(e.target.className.includes('form-edit-create-close-icon')) {
      const formCreate = e.target.parentNode.parentNode;

      if(this.state.formCreate === 'open') {
        formCreate.style.display = 'none';
        this.setState({formCreate: 'close'});
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const fromCreate = document.forms.create;

    // todoCreateTitle
    // todoCreateDescription
    // todoCreateDateStart
    // todoCreateDateEnd
    // todoCreateSelect

  }

  render() {
    const objOptions = {
      lime: "ЛАЙМ",
      fff: "ффф",
      QQQ: "ййй"
    };
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12" onClick={this.handleClick}>
            <nav className="menu">
              <button className="menu__createBtn">Создать<span className="material-icons-round md-24">alarm_add</span></button>
              <div className="menu__user"><span className="material-icons-round md-36">account_circle</span>{this.props.user}</div>
            </nav>

            <form method="POST" className="todo__form-create" name="create" onSubmit={this.handleSubmit}>
              <div className="form-edit-create-close"><span className="material-icons-round form-edit-create-close-icon md-24">cancel</span></div>
              
              <div><label htmlFor="todo-create-title">Заголовок</label></div>
              <div><input type="text" id="todo-create-title" name="todoCreateTitle" /></div>
              
              <div><label htmlFor="todo-create-description">Текст</label></div>
              <div><textarea id="todo-create-description" rows="10" cols="25" name="todoCreateDescription"></textarea></div>
              
              <div><label htmlFor="todo-create-date-start">Дата начала</label></div>
              <div><input type="date" id="todo-create-date-start" name="todoCreateDateStart" /></div>

              <div><label htmlFor="todo-create-date-end">Дата конца</label></div>
              <div><input type="date" id="todo-create-date-end" name="todoCreateDateEnd" /></div>

              <div><label>Дата кого</label></div>
              <select name="todoCreateSelect">
                {
                  Object.keys(objOptions).map( (option) => {
                    <option key={option} vlaue={option}>{objOptions[option]}</option>
                  })
                }
              </select>

              <div>Автор: Олег <input type="submit" value="Создать" /></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}