import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

// reducer
const todo = (state, action) => {
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

const todos = (state = [], action) => {
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

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
}

// const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     }
// }


// combining multiple reducers
const todoApp = combineReducers({
    todos,
    visibilityFilter
})

let nextId = 1;

// actions
const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: nextId++,
        text,
        completed: false
    }
}

const toogleTodo = (id) => {
    return {
        type: 'TOOGLE_TODO',
        id
    }
}

const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}

const store = createStore(todoApp);

// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------------');

// console.log('Dispatching action...');
// store.dispatch(addTodo('Todo 1'));

// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------------');

// console.log('Toogling a todo');
// store.dispatch(toogleTodo(1));

// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------------');

// console.log('Setting visibility filter');
// store.dispatch(setVisibilityFilter('SHOW_COMPLETED'))

// console.log('Initial state:');
// console.log(store.getState());
// console.log('----------------');

// //tests
// const addTodoTest = () => {
//     let initialState = []
//     let afterAddState = todos(initialState, addTodo('Todo 1'))
//     console.log(afterAddState.length === 1 ? 'passed' : 'failed');
// }

// const toogleTodoTest = () => {
//     let initialState = [{id: 1, text: 'todo 1', completed: false}, {id: 2, text: 'todo 2', completed: false}]
//     let afterToogle = todos(initialState, toogleTodo(1));
//     console.log(afterToogle[0].completed ? 'passed' : 'failed');
//     console.log(afterToogle[1].completed ? 'failed' : 'passed');
// }

// addTodoTest();
// toogleTodoTest();

const Link = ({active, onClickFilter, children}) => {
    
    if (active) {
        return <span>{children}</span>
    }
    
    return (
        <a href="#"
            onClick={ e => {
                e.preventDefault();
                onClickFilter()                
            }}
        >
            {children}
        </a>
    )
}

class FilterLink extends React.Component {

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return <Link active={this.props.filter === store.getState().visibilityFilter}
                onClickFilter={() => store.dispatch(setVisibilityFilter(this.props.filter))}>{this.props.children}</Link>
    }
}

class VisibleTodoList extends React.Component {
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate();
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <TodoList 
                todos={getVisibleTodos(state.todos, state.visibilityFilter)} 
                onTodoClick={(id) => store.dispatch(toogleTodo(id))}/>
        )
    }
}

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        default:
            return todos;
    }
}

// Presentational component
// Apenas recebe e exibe informações
const Todo = ({onClick, text, completed}) => {
    return (
        <li 
        onClick={onClick} 
        style={{textDecoration: completed ? 'line-through' : 'none'}}>{text}</li>
    )
}

//Presentational component
const TodoList = ({todos, onTodoClick}) => {
    return (
        <ul>
            {
                todos.map(todo => 
                    <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
                )
            }
        </ul>
    )
}

const AddTodo = () => {
    let input;
    return (
        <div>
            <input type="text" ref={ node => input = node} />
            <button onClick={() => 
                {
                    store.dispatch(addTodo(input.value))
                    input.value = '';
                    input.focus()}}>Add Todo</button>
        </div>
    )
}

const Footer = () => (
    <p>
    Show: 
        <FilterLink filter='SHOW_ALL'>ALL</FilterLink>{' '} 
        <FilterLink filter='SHOW_COMPLETED'>COMPLETED</FilterLink>{' '}
        <FilterLink filter='SHOW_ACTIVE'>ACTIVE</FilterLink>
    </p>
)

const TodoApp = () =>
    (<div>
        <AddTodo />            
        <VisibleTodoList />
        <Footer />
     </div>)

const render = () => {
    ReactDOM.render(
        <div>
            <TodoApp />
        </div>,
        document.getElementById('root')
    )
}

store.subscribe(render);
render();
