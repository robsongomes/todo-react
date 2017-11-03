// import todos, { visibilityFilter, getVisibleTodos as fromTodos } from "./TodoReducers";
import * as reducers from "./TodoReducers";
import { combineReducers } from 'redux';

// combining multiple reducers
const todoAppReducers = combineReducers({
    todos: reducers.todos,
    visibilityFilter: reducers.visibilityFilter
})

export default todoAppReducers;

export const getVisibleTodos = (state, filter) => reducers.getVisibleTodos(state.todos, filter);