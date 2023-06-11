import React, { useEffect, useState } from 'react'
import './todo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Todo = () => {

    const [tasks, setTasks] = useState([])
    const [todo, setTodo] = useState('')
    const [newDescription, setNewDescription] = useState('');


    const handleChange = (e) => {
        setTodo(
            e.target.value
        )
    }
    const handleDescriptionChange = (event) => {
        setNewDescription(event.target.value);
    };


    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/todo/all');
            if (response.ok) {
                const todos = await response.json();
                setTasks(todos);
            } else {
                console.error('Failed to fetch todos');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

      
        fetchTodos();
    }, []);

    //curl --location --request DELETE 'http://localhost:3000/todo/deleteTodo/6484671be009d8fb1105e144'
    const handleDeleteTask = (id) => {

        fetch(`http://localhost:3000/todo/deleteTodo/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                fetchTodos();
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    //add todo to the list
    const handleSubmit = () => {
        fetch('http://localhost:3000/todo/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: todo,
                description: newDescription
            })
        })
            .then(res => res.json())
            .then(data => {
                fetchTodos();
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

            setTodo('');
            setNewDescription('');
    }


    /* curl --location --request POST 'http://localhost:3000/todo/markCompleted/64835e1dd0926209042b664c'
    */
    const handleToggleComplete = (id) => {
        fetch(`http://localhost:3000/todo/markCompleted/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                completed: true
            })
        })
            .then(res => res.json())
            .then(data => {
                fetchTodos();
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (

        <div className="App">
            <h1>Todo App</h1>
            <div className="todo">

                <input
                    type="text"
                    placeholder="Add your task"
                    onChange={handleChange}
                    value={todo}
                />
                <input
                    type="text"
                    value={newDescription}
                    onChange={handleDescriptionChange}
                    placeholder="Enter a description"
                />
                <button onClick={handleSubmit}>Add</button>


            </div>
            <ul className="TaskList">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleComplete(task._id)}
                        />
                        <div className="TaskDetails">
                            <div className="TaskTitle">{task.title}</div>
                            <div className="TaskDescription">{task.description}</div>
                        </div>
                        <button className= "DeleteButton" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )


}

export default Todo