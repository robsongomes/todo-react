import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toogleTodo } from '../actions/TodoActions';
import { getVisibleTodos } from '../reducers/';
import TodoList from '../components/TodoList';

const mapStateToProps = (state, {match}) => {
    return {
        todos: getVisibleTodos(state, match.params.filter || 'all')
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onTodoClick: id => dispatch(toogleTodo(id))
//     }
// }
// { onTodoClick: toogleTodo } - forma simplificada

const VisibleTodoList = withRouter(connect(mapStateToProps, { onTodoClick: toogleTodo } )(TodoList));

export default VisibleTodoList;