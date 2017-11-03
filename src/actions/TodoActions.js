import { v4 } from "node-uuid";
// actions
export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text,
        completed: false
    }
}

export const toogleTodo = (id) => {
    return {
        type: 'TOOGLE_TODO',
        id
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}