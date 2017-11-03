import Link from './Link';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions/TodoActions';

const mapStateToLinkProps = (
    state,
    owProps
) => {
    return {
        active: owProps.filter === state.visibilityFilter
    }
}

const mapDispatchToLinkProps = (
    dispatch,
    owProps
) => {
    return {
        onClickFilter: () => {
            dispatch(setVisibilityFilter(owProps.filter))
        }
    }
}

const FilterLink = connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);

export default FilterLink;