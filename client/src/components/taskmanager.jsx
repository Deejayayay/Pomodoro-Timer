import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/task.css'
import 'boxicons'

function TaskList() {
    const [array, setArray] = useState([]);
    const [task, setTask] = useState("");  // Handle a single task input

    // Fetch the task list from the API
    const fetchAPI = async () => {
        const response = await axios.get("http://127.0.0.1:5987/api/taskdb");
        setArray(response.data.task);
    };

    // Fetch tasks when component mounts
    useEffect(() => {
        fetchAPI();
    }, []);

    // Add a new task via the API
    const addTask = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5987/api/taskdb", { task });
            console.log("Task Added", response.data);
            setTask("");  // Clear input after adding task
            fetchAPI();  // Re-fetch tasks after adding
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete a task via the API
    const deleteTask = async (id) => {
        try {
            const response = await axios.delete("http://127.0.0.1:5987/api/taskdb", {
                data: { id }  // Send task id to delete
            });
            console.log('Task deleted:', response.data);
            fetchAPI();  // Re-fetch tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className='task-container'>
            <h1>Tasks</h1>
                {/* Loop through the array and display each task with delete and edit buttons */}
                {array.map((task) => (
                    <li key={task.id}>
                        {task.name}
                        <button className='task-btn'>
                            <box-icon name='message-square-edit'></box-icon>
                        </button>
                        <button className='task-btn' onClick={() => deleteTask(task.id)}>
                            <box-icon name='trash'></box-icon>
                        </button>
                    </li>
                ))}

            {/* Input field to add new task */}
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter new task"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

export default TaskList;
