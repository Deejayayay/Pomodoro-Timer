import { useState, useEffect, Component } from 'react'
import * as React from "react";
import './App.css'
import axios from 'axios'
import PomodoroTimer from './components/pomodoro';

/**
 * ToDo
 * get styling ready
 * create methods to post to the API
 * do styling for whole page
 *  -get a moodboard out and look/ 
 *      -current inspo is monkey type I want to go for a similar theme as I like the yellow
 */
function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:5987/api/taskdb");
    setArray(response.data.task);
  };

  useEffect (() => {
    fetchAPI();
  }, []);




  return (
    <>
    <div className='timer-box'>
      <PomodoroTimer></PomodoroTimer>

    </div>
    <div className='task-box'>
      <h1>Tasks</h1>
      <ul>
        {
        array.map((task, index) => (
          <li key={index}>{task}</li>
        ))
        }  
      </ul>
    </div>
    </>
  )
}

export default App
