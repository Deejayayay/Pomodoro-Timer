// Import React, along with useState and useEffect hooks.
import React, { useState, useEffect } from 'react'; 
import '../styles/pomodoro.css'; // Import the associated CSS file for styling.


const PomodoroTimer = () => {

    const [timeRemaining, setTimeRemaining] = useState(25*60);
    const [isRunning, setIsRunning] = useState(false);
    const [timerType, setTimerType] = useState('pomodoro');

    useEffect(() => {
        let timer;
        if(isRunning && timeRemaining > 0){
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime -1);
            }, 1000);
        } else if (timeRemaining === 0){
            alert('session completed');
        }
        return () => {
            clearInterval(timer);
        };
    }, [isRunning, timeRemaining, timerType]);

    const start = () => {
        if(!isRunning) setIsRunning(true);
        console.log(isRunning)
    }

    const stop = () => {
        if(isRunning) setIsRunning(false);
        console.log(isRunning)
    }
    
    const reset = () =>{
        if(isRunning){
            
        }
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return (
        <div>
            <h1>{formatTime(timeRemaining)}</h1>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>reset</button>
        </div>
    )
};

export default PomodoroTimer; // Export the PomodoroTimer component.
