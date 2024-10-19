import React, { useState, useEffect } from 'react';
import '../styles/pomodoro.css'; // Import your CSS here

/*
ToDO
fix switching between timers, removing the zero off the short timer
  -current issue is that when cycling through its not the correct timer
a way to get the total times you pomodoroed

*/
const PomodoroTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState(25 * 60); // Default is 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [timerType, setTimerType] = useState('pomodoro'); // Could be 'pomodoro', 'shortBreak', 'longBreak'

    useEffect(() => {
        let timer;
        if (isRunning && timeRemaining > 0) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            alert(`${timerType === 'pomodoro' ? 'Pomodoro session' : timerType === 'shortBreak' ? 'Short break' : 'Long break'} complete!`);
            resetTimer();
        }

        return () => clearInterval(timer);
    }, [isRunning, timeRemaining, timerType]);

    const startTimer = () => {
        if (!isRunning) setIsRunning(true);
    };

    const stopTimer = () => {
        setIsRunning(false);
    };

    const resetTimer = () => {
        stopTimer();
        switch (timerType) {
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

    const setPomodoro = () => {
        setTimerType('pomodoro');
        resetTimer(); // Reset timer when changing the type
    };

    const setShortBreak = () => {
        setTimerType('shortBreak');
        resetTimer(); // Reset timer when changing the type
    };

    const setLongBreak = () => {
        setTimerType('longBreak');
        resetTimer(); // Reset timer when changing the type
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            <button onClick={setPomodoro}>Pomodoro</button>
            <button onClick={setShortBreak}>Short Break</button>
            <button onClick={setLongBreak}>Long Break</button>
            
            <h1>{formatTime(timeRemaining)}</h1>

            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
};

export default PomodoroTimer;
