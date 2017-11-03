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