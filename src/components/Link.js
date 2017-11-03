import { Link } from 'react-router-dom';

const FilterLink = ({filter}) => (
    <Link
        to={filter === 'all' ? '' : filter}
        activeStyle={{
            text-decoration: 'none',
            color: 'black',
        }}
    >
    </Link>
)