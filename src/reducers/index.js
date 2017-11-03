import { todos, visibilityFilter } from "./TodoReducers";
import { combineReducers } from 'redux';

// combining multiple reducers
const todoAppReducers = combineReducers({
    todos,
    visibilityFilter
})

export default todoAppReducers;