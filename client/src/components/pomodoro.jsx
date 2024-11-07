import React, { useState, useEffect } from 'react';
import '../styles/pomodoro.css'

const PomodoroTimer = () => {
    const [activeTimer, setActiveTimer] = useState('pomodoro'); // Default active timer

    const handleButtonClick = (timerType) => {
        setActiveTimer(timerType);
        switchTimer(timerType);
    };


    const [timeRemaining, setTimeRemaining] = useState(25 * 60); // Default is 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [timerType, setTimerType] = useState('pomodoro'); // Could be 'pomodoro', 'shortBreak', 'longBreak'
    const [updating, setUpdating] = useState(false); // To trigger animation class
    const [clickedButton, setClickedButton] = useState(null);

    useEffect(() => {
        let timer;
        if (isRunning && timeRemaining > 0) {
            setUpdating(true); // Trigger animation on time change
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            alert(`${timerType === 'pomodoro' ? 'Pomodoro session' : timerType === 'shortBreak' ? 'Short break' : 'Long break'} complete!`);
            setIsClicked(false);
            resetTimer();
        }

        // Remove the updating class after each change
        const timeout = setTimeout(() => setUpdating(false), 500);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout); // Clean up timeout when component unmounts
        };
    }, [isRunning, timeRemaining, timerType]);

    const startTimer = (buttonId) => {
        if (!isRunning) setIsRunning(true);
        setClickedButton(buttonId);
    };

    const stopTimer = (buttonId) => {
        setIsRunning(false);
        setClickedButton(buttonId);
    };

    const resetTimer = (newTimerType = timerType) => {
        switch (newTimerType) {
            case 'pomodoro':
                setTimeRemaining(25 * 60);
                setClickedButton(null);
                break;
            case 'shortBreak':
                setTimeRemaining(5 * 60);

                break;
            case 'longBreak':
                setTimeRemaining(15 * 60);

                break;
            default:
                setTimeRemaining(25 * 60);

        }
    };

    const switchTimer = (newTimerType) => {
        if (isRunning) {
            // Pause before switching if the timer is running
            stopTimer();  // Stop the current timer
            setTimeout(() => {
                setTimerType(newTimerType);  // Switch to the new timer type
                resetTimer(newTimerType);  // Reset the timer for the new type
            }, 1500);  // Pause for 2 seconds before switching
        } else {
            // Instant switch if the timer is not running
            setTimerType(newTimerType);
            resetTimer(newTimerType);
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="timer">
        <div className='timer-btn-container'>
            <button
                className={`timer-btn ${activeTimer === 'pomodoro' ? 'active' : ''}`}
                onClick={() => handleButtonClick('pomodoro')}
            >
                Pomodoro
            </button>
            <button
                className={`timer-btn ${activeTimer === 'shortBreak' ? 'active' : ''}`}
                onClick={() => handleButtonClick('shortBreak')}
            >
                Short Break
            </button>
            <button
                className={`timer-btn ${activeTimer === 'longBreak' ? 'active' : ''}`}
                onClick={() => handleButtonClick('longBreak')}
            >
                Long Break
            </button>
        </div>    

            <div className='time-container'>
                <header>{formatTime(timeRemaining)}</header>
            </div>

            <div className='user-btn-container'>
                <button 
                  className={`user-btn ${clickedButton === "button1" ? "clicked" : ""}`} 
                  onClick={() => startTimer("button1")}
                >
                  <ion-icon name="play-outline"></ion-icon>
                </button>
                <button   
                  className={`user-btn ${clickedButton === "button2" ? "clicked" : ""}`} 
                  onClick={() => stopTimer("button2")}
                >
                  <ion-icon name="pause-circle-outline"></ion-icon>
                </button>
                <button className='user-btn'onClick={resetTimer}>
                    <ion-icon name="refresh-outline"></ion-icon>
                </button>
            </div>

        </div>
    );
};

export default PomodoroTimer;
