import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/task.css';
import 'boxicons';

function TaskList() {
    const [array, setArray] = useState([]);  // Array to store tasks
    const [task, setTask] = useState("");  // Handle a single task input
    const [showInput, setShowInput] = useState(false);  // State to toggle input container visibility

    // Fetch the task list from the API
    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5987/api/taskdb");
            setArray(response.data.task);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
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
            setShowInput(false);  // Hide input after adding task
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
        <div className='task-header'>
            <h2>Tasks</h2>
        </div>
        
        <div className='add-task-container'>
            <button className='add-task' onClick={() => setShowInput(!showInput)}>
                <ion-icon name="add-circle-outline"></ion-icon>    
                <p>{showInput ? 'Cancel' : 'Add Task'}</p>
            </button>
        </div>


            {/* Input container - only shown when showInput is true */}
            {showInput && (
                <div className='input-container'>

                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        placeholder="Enter new task"
                    />
                    <button onClick={addTask}>
                        <ion-icon name="enter-outline"></ion-icon>
                    </button>
                </div>
            )}
            
            <div className='task-list'>
                <ul>
                    {array.map((taskItem) => (
                        <li key={taskItem.id}>
                            <p className='task'>{taskItem.name}</p>

                            <div className='task-btn-container'>
                                <button className='task-btn'>
                                    <ion-icon name="create-outline"></ion-icon>
                                </button>
                                <button className='task-btn' onClick={() => deleteTask(taskItem.id)}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>            
        </div>
    );
}

export default TaskList;
