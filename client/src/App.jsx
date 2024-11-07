import { useState, useEffect, Component } from 'react'
import * as React from "react";
import './App.css'
import PomodoroTimer from './components/pomodoro';
import TaskList from './components/taskmanager';
/**
 * ToDo
 * get styling ready
 * create methods to post to the API
 * do styling for whole page
 *  -get a moodboard out and look/ 
 *      -current inspo is monkey type I want to go for a similar theme as I like the yellow
 */

function App() {
  return (
    <>
    <div className='parent'>
      <div className='header'>
        <h1>Poro-Timer</h1>
      </div>
    
      <div className="middle">
        <PomodoroTimer></PomodoroTimer>
        <TaskList></TaskList>
      </div>

      <div className='footer'>
        <p className='footer-text'>Created By DeAngelo Ola</p>
        <a href="https://github.com/Deejayayay">
          <img src="https://static-00.iconduck.com/assets.00/github-icon-479x512-ljyk25j8.png" alt="github" />
        </a>
        <a href="https://www.linkedin.com/in/deangelojoshuaola/">
          <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-b5owxava.png" alt="linkedin" />
        </a>
      </div>
    </div>
    </>
  )
}

export default App
