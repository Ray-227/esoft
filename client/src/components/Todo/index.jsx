import React from 'react';
import './index.scss';


export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controlPanel: 'close',
      formEdit: 'close',
      controlComplete: 'not completed'
    }

    this.handleClick = this.handleClick.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick(e) {

    if (e.target.className.includes('todo__control-complete')) {
      const todo = e.target.parentNode.parentNode.parentNode.parentNode;
      const controlComplete = todo.querySelector('.todo__control-complete');

      if (this.state.controlComplete === 'not completed') {
        todo.classList.add('todo_complete');
        controlComplete.innerHTML = 'close';
        this.setState({controlComplete: 'completed'});
      } else if (this.state.controlComplete === 'completed') {
        todo.classList.remove('todo_complete');
        controlComplete.innerHTML = 'task_alt';
        this.setState({controlComplete: 'not completed'});
      }

      // Сохранить в БД, что уже завершено и определять это в this.state
    }

    if (e.target.className.includes('todo__edit')) {
      const todo = e.target.parentNode.parentNode.parentNode.parentNode;
      const formEdit = todo.querySelector('.todo__form-edit');
      const formEditClose = formEdit.querySelector('.form-edit-close');

      if (this.state.formEdit === 'close') {
        formEdit.style.display = 'block';
        this.setState({formEdit: 'open'});
      } else if (this.state.formEdit === 'open') {
        formEdit.style.display = 'none';
        this.setState({formEdit: 'close'});
      }

      formEditClose.onclick = () => {
        formEdit.style.display = 'none';
        this.setState({formEdit: 'close'});
      };

      // Отслеживать клик по кнопке сохранить и изменять данные в БД после с помощью AJAX подтягивать через innerHTML
    }

    if (e.target.className.includes('todo__control-delete')) {
      const todo = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
      todo.remove();

      // Удаление на сервере
    }


    if (e.target.parentNode.className.includes('todo__setting')) {
      const control = e.target.parentNode.querySelector('.todo__control');
      const settingIcon = e.target.parentNode.querySelector('.todo__setting-icon');
  
      if (this.state.controlPanel === 'close') {
        control.style.display = 'block';
        settingIcon.innerHTML = 'cancel';
        this.setState({controlPanel: 'open'});
      } else if (this.state.controlPanel === 'open') {
        control.style.display = 'none';
        settingIcon.innerHTML = 'pending';
        this.setState({controlPanel: 'close'});
      }
    }

  }

  handleSubmit(e) {
    e.preventDefault();
    const formEdit = document.forms.edit;
    console.log(formEdit.todoTitle.value);
    console.log(formEdit.todoDescription.value);
  }

  render() {
    let status;
    if (this.props.status === 'l' || this.props.status === 'low') {
      status = <div className="todo__priority_low"></div>;
    } else if (this.props.status === 'm' || this.props.status === 'medium') {
      status = <div className="todo__priority_medium"></div>
    } else if (this.props.status === 'h' || this.props.status === 'high') {
      status = <div className="todo__priority_high"></div>
    }

    return (
      <div className="col-xl-3 col-lg-4 col-md-6 col-12">
        <div className="todo" data-todo="data-test">

        <form method="POST" className="todo__form-edit" name="edit" onSubmit={this.handleSubmit}>
          <div className="form-edit-close"><span className="material-icons-round md-18">cancel</span></div>
          <div><label htmlFor="todo-title">Изменить заголовок</label></div>
          <div><input type="text" id="todo-title" name="todoTitle"/></div>
          <div><label htmlFor="todo-description">Изменить текст</label></div>
          <div><textarea id="todo-description" rows="10" cols="25" name="todoDescription"></textarea></div>
          <div><input type="submit" value="Сохранить" /></div>
        </form>

          <div className="todo__info">

            {status}

            <div className="todo__setting" onClick={this.handleClick}>
              <span className="material-icons-round todo__setting-icon">pending</span>
              
              <div className="todo__control">
                <span className="material-icons-round md-18 todo__control-complete">task_alt</span>

                <span className="material-icons-round md-18 todo__edit">build</span>

                <span className="material-icons-round md-18 todo__control-delete">delete</span>
              </div>

            </div>


          </div>


          <div className="todo__title">{this.props.title}</div>


          <div className="todo__info">
            <div className="todo__author">
              <span className="material-icons-round todo_author-icon">perm_identity</span>
              <div className="todo__author-name">{this.props.author}</div>
            </div>

            <div className="todo__date">
              <span className="material-icons-round todo__date-icon">date_range</span>
              <div className="todo__date-range">
                <div className="todo__date-start">{this.props.dateStart}</div>
                <div className="todo__date-end">{this.props.dateEnd}</div>
              </div>
            </div>
          </div>

          <div className="todo__description">{this.props.description}</div>

        </div>
      </div>
    )
  }
}