import React, { useState, useEffect } from 'react';
import '../styles/pomodoro.css'

const PomodoroTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(25 * 60); // Default is 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [timerType, setTimerType] = useState('pomodoro'); // Could be 'pomodoro', 'shortBreak', 'longBreak'
    const [updating, setUpdating] = useState(false); // To trigger animation class

    useEffect(() => {
        let timer;
        if (isRunning && timeRemaining > 0) {
            setUpdating(true); // Trigger animation on time change
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            alert(`${timerType === 'pomodoro' ? 'Pomodoro session' : timerType === 'shortBreak' ? 'Short break' : 'Long break'} complete!`);
            resetTimer();
        }

        // Remove the updating class after each change
        const timeout = setTimeout(() => setUpdating(false), 500);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout); // Clean up timeout when component unmounts
        };
    }, [isRunning, timeRemaining, timerType]);

    const startTimer = () => {
        if (!isRunning) setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = (newTimerType = timerType) => {
        switch (newTimerType) {
            case 'pomodoro':
                setTimeRemaining(25 * 60);
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
            {/* Call the switchTimer function with the timer type as the argument */}            
            <button className='timer-btn' onClick={() => switchTimer('pomodoro')}>Pomodoro</button>
            <button className='timer-btn' onClick={() => switchTimer('shortBreak')}>Short Break</button>
            <button className='timer-btn' onClick={() => switchTimer('longBreak')}>Long Break</button>
            
            <h1>{formatTime(timeRemaining)}</h1>

            <button onClick={startTimer}>
                <box-icon name='play' ></box-icon>
            </button>
            <button onClick={stopTimer}>
                <box-icon name='pause'></box-icon>
            </button>
            <button onClick={resetTimer}>
                <box-icon name='reset' ></box-icon>
            </button>
        </div>
    );
};

export default PomodoroTimer;
