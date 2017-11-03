// reducer
export const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: action.completed
            };
        case 'TOOGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
    
        default:
            return state;
    }
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ]
        case 'TOOGLE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state    
    }
}

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

//selector
export const getVisibleTodos = (state, filter) => {
    switch(filter) {
        case 'completed':
            return state.filter(t => t.completed);
        case 'active':
            return state.filter(t => !t.completed);
        default:
            return state;
    }
}

export default todos;