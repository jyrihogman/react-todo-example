import React from 'react';
import PropTypes from 'prop-types';

const AppBar = props => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<button
			className="btn btn-primary btn-lg"
			style={{ color: 'white' }}
			onClick={props.deleteAllTodos}
		>
			Delete all Todos!
		</button>
	</nav>
);

AppBar.propTypes = {
	deleteAllTodos: PropTypes.func.isRequired,
};

export default AppBar;
