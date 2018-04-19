import React, { Component } from 'react';
import TodoList from './TodoExample/TodoList';
import AddTodo from './TodoExample/AddTodo';
import AppBar from './TodoExample/AppBar';

import './TodoApp.css';

export default class App extends Component {
	state = {
		todos: [],
	};

	componentDidMount() {
		this.performGet();
	}

	addTodo = (todo) => {
		const { todos } = this.state;
		const todoId = todos.length === 0 ? 1 : todos.slice(this.state.todos.length - 1)[0].id + 1;
		const newTodo = Object.assign({ id: todoId, isDone: false }, todo);

		this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }));
		this.performSave(newTodo);
	}

	deleteTodo = (event) => {
		const todoId = parseInt(event.currentTarget.id, 0);
		this.setState(prevState => ({ todos: prevState.todos.filter(todo => todo.id !== todoId) }));
		this.performDelete(todoId);
	}

	setTodoDone = (event) => {
		const { todos } = this.state;
		const todoId = parseInt(event.currentTarget.value, 0);
		const todoIndex = todos.findIndex(todo => todo.id === todoId);
		const newTodo = Object.assign({}, todos[todoIndex], { isDone: true });
		const newTodos = [...todos.slice(0, todoIndex), newTodo, ...todos.slice(todoIndex + 1)];

		this.setState({
			todos: newTodos,
		});

		this.performUpdate(newTodo, todoId);
	}

	deleteAllTodos = () => {
		const { todos } = this.state;
		this.setState({
			todos: [],
		});

		todos.map(todo => this.performDelete(todo.id));
	}

	performGet = () => {
		fetch('http://localhost:3000/todos')
			.then(response => response.json())
			.then(todos => this.setState({ todos }))
			.catch(error => console.log(error));
	}

	performSave = (todo) => {
		fetch('http://localhost:3000/todos', {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(todo),
		})
			.then(response => response.json())
			.catch(error => console.log(error));
	}

	performDelete = (todoId) => {
		fetch(`http://localhost:3000/todos/${todoId}`, { method: 'DELETE' })
			.then(response => response.json())
			.catch(error => console.log(error));
	}

	performUpdate = (todo, todoId) => {
		fetch(`http://localhost:3000/todos/${todoId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
			body: JSON.stringify(todo),
		})
			.then(response => response.json())
			.catch(error => console.log(error));
	}

	render() {
		return (
			<div>
				<AppBar deleteAllTodos={this.deleteAllTodos} />
				<div>
					<AddTodo addTodo={this.addTodo} />
				</div>
				<div>
					{!this.state.todos.length ?
						null
						:
						<TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} setTodoDone={this.setTodoDone} />
					}
				</div>
			</div>
		);
	}
}

