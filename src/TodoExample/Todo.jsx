import React from 'react';
import PropTypes from 'prop-types';

const Todo = (props) => {
	const {
		id, title, description, deleteTodo, setTodoDone, isDone,
	} = props;

	const cardColor = isDone ? 'text-white bg-secondary' : '';
	const btnColor = isDone ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm';

	return (
		<div id={id} className={`card ${cardColor} col-md-2`} style={{ margin: '2%' }} >
			<div className="card-body">
				<h4 className="card-title">{title}</h4>
				<p className="card-text">{description}</p>
			</div>
			<div style={{ margin: '5%' }}>
				{!isDone &&
					<button
						value={id}
						style={{ marginRight: '10%' }}
						onClick={setTodoDone}
						className={btnColor}
					>Done
					</button>
				}
				<button
					id={id}
					onClick={deleteTodo}
					className={btnColor}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

Todo.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	isDone: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	setTodoDone: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
};

export default Todo;
