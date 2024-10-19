import React, { useState, useEffect } from 'react'

function App() {
  const [people, setPeople] = useState([]);
  //gets the data from the json in the database 
  useEffect(() => {
    // Fetch data from Flask API
    fetch('http://localhost:5000/people')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <div className='report-box'>alloted time pomodoroed</div>
      <div className='music-player'>music</div>
      <div className='timer-box'>25:00</div>

      <div className='task-box'>      
      <ul>
        {people.map((person) => (
          <li key={person.ssn}>
            {person.firstName} {person.lastName} - {person.age} years old
          </li>
        ))}
      </ul>
      </div>

    </div>
  )
}

export default App