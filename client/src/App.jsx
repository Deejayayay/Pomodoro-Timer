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
      <h1>Poro-Timer</h1>
      <PomodoroTimer></PomodoroTimer>
      <TaskList></TaskList>
      <div className='footer'>
        footah
      </div>
    </div>
    </>
  )
}

export default App
