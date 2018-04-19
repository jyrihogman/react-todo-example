import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const TodoList = (props) => {
	const todoComponents = props.todos.map(todo => (
		<Todo
			deleteTodo={props.deleteTodo}
			setTodoDone={props.setTodoDone}
			key={todo.id}
			id={todo.id}
			isDone={todo.isDone}
			title={todo.title}
			description={todo.description}
		/>
	));

	return (
		<div className="col-md-12">
			<div className="row justify-content-md-center">
				{todoComponents}
			</div>
		</div>
	);
};

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		isDone: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	})).isRequired,
	deleteTodo: PropTypes.func.isRequired,
	setTodoDone: PropTypes.func.isRequired,
};

export default TodoList;
