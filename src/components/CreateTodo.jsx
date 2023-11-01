import React from 'react';
import { useRef } from 'react';

export const CreateTodo = ({ todos, dispatch, isFormClosed }) => {

	const titleRef = useRef();
	const descriptionRef = useRef();

	const handleCreateTodo = (e) => {

		e.preventDefault();

		let title = titleRef.current.value;
		let description = descriptionRef.current.value;

		if (title === "") {
			alert(`Please provide a "Title"`);
		} else if (description === "") {
			alert(`Please provide a "Description"`);
		} else {
			dispatch({
				type: "ADD_TODO",
				payload: {
					id: todos.length !== 0 ? todos[todos.length - 1]["id"] + 1 : 1,
					title: title,
					description: description,
					complete: false,
				},
			});

			titleRef.current.value = "";
			descriptionRef.current.value = "";
			document.getElementById("create-todo").classList.add("hidden");
		}
	};

	return (
		<div id='create-todo' className='hidden'>
			<div id='close-form'
				onClick={() =>
					document.getElementById("create-todo").classList.add("hidden")
				}
			>
				Close
			</div>
			<h2>Create a Todo</h2>
			<form onSubmit={handleCreateTodo}>
				<label htmlFor="todo-title">Title:</label>
				<input
					ref={titleRef}
					type="text"
					name="todo-title"
					id="todo-title"
				/>
				<label htmlFor="todo-description">Description:</label>
				<textarea
					ref={descriptionRef}
					name="todo-description"
					id="todo-description"
					cols="30"
					rows="10"
				></textarea>
				<button type="submit">Create</button>
			</form>
		</div>
	)
}
