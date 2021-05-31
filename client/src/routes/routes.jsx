import React, { Fragment } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import Auth from '@/components/Auth/index.jsx';

import Menu from '@/components/Menu/index.jsx';

import TodoContainer from '@/components/TodoContainer/index.jsx';
import Todo from '@/components/Todo/index.jsx';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/todo" exact>
          <Fragment>
            <Menu user="Гоша"/>
            <TodoContainer>
              <Todo 
                status="l"
                title="Название 1"
                author="Гоша"
                dateStart="31.05.2021"
                dateEnd="20.06.2021"
                description="Описание 1"
              />
              <Todo 
                status="l"
                title="Название 2"
                author="Андрей"
                dateStart="31.05.2021"
                dateEnd="20.06.2021"
                description="Описание 2"
              />
              <Todo 
                status="l"
                title="Название 3"
                author="Гоша"
                dateStart="31.05.2021"
                dateEnd="20.06.2021"
                description="Описание 3"
              />
              <Todo 
                status="l"
                title="Название 4"
                author="Гоша"
                dateStart="31.05.2021"
                dateEnd="20.06.2021"
                description="Описание 4"
              />
            </TodoContainer>
          </Fragment>
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