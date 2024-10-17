import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])
  //gets the data from the json in the database 
  useEffect(() => {
    fetch("/task").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      <div className='report-box'>alloted time pomodoroed</div>
      <div className='music-player'>music</div>
      <div className='timer-box'>25:00</div>

      <div className='task-box'>      
        {(typeof data.task === 'undefined') ? (
        <p>loading...</p>
      ) : (
        data.task.map((task, i) => (
          <p key={i}>{task}</p>
        ))
      )}
      </div>

    </div>
  )
}

export default App