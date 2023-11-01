import React from 'react';
import { useReducer, useEffect, useState } from 'react';
import { CreateTodo } from './CreateTodo';

const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reducer = (state, action) => {
	switch (action.type) {
		case "ADD_TODO":
			console.log(state);
			return [
				...state,
				{ ...action.payload },
			];

		case "COMPLETE_TODO":
			return state.map((todo) => {
				if (todo.id === action.id) {
					return { ...todo, complete: !todo.complete };
				} else {
					return todo;
				}
			});

		case "DELETE_TODO":
			return state.filter((todo) => {
				return todo.id !== action.id;
			});

		default:
			return state;
	}
};

export const Todos = () => {

	const [todos, dispatch] = useReducer(reducer, initialTodos);

	const [localTodos, setLocalTodos] = useState([]);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
		setLocalTodos(JSON.parse(localStorage.getItem("todos")));
		console.log(localTodos);
	}, [todos]);

	const handleCompleteTodo = (id) => {
		dispatch({ type: "COMPLETE_TODO", id: id })
	};

	const handleDeleteTodo = (id) => {
		dispatch({ type: "DELETE_TODO", id: id })
	};

	const openForm = () => {
		document.getElementById("create-todo").classList.remove("hidden")
		document.getElementById("create-todo").classList.add("show");
	}

	return (
		<>
			<CreateTodo
				todos={localTodos}
				dispatch={dispatch}
			/>

			<div id="todos-header">
				<h2>Productivae</h2>
				<button id='open-form'onClick={openForm}>
					Create Todo
				</button>
			</div>
			<div id="todo-items">
				{!localTodos.length ? (
						<div id='error-msg'>
							Ooops! No todo found. You can create one by clicking on the "Create Todo" button above.
						</div>
					) : (
						localTodos.map((todo) => (
							<div className='todo' key={ todo.id }>
								<div className="todo-head">
									<h3>{ todo.title }</h3>
									<label className="switch">
										<input
											type="checkbox"
											checked={todo.complete}
											onChange={() => handleCompleteTodo(todo.id)}
										/>
										<span className="slider round"></span>
									</label>
								</div>
								<p>{ todo.description }</p>
								<button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
							</div>
						))
				)}
			</div>
		</>
	)
}
