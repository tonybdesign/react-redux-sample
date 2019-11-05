import React from "react";
import { Route, Switch } from "react-router-dom";

import TodoList from './containers/TodoList';
import AddEditTodo from './containers/AddEditTodo';

const Routes = () =>  <Switch>
    <Route extact path="/edit/:id?" component={AddEditTodo} />
    <Route path="/:filter?" component={TodoList} />
</Switch>

export default Routes;