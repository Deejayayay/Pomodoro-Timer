import React, { useState, useEffect } from 'react'
import './globalstyles.css'
function App() {
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
});
  //gets the data from the json in the database 
  useEffect(() => {
    // Fetch data from Flask API
    fetch("/data").then((res) =>
      res.json().then((data) => {
          // Setting a data from api
          setdata({
              name: data.Name,
              age: data.Age,
              date: data.Date,
              programming: data.programming,
          });
      })
  );
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">boto</h1>
      <div className='report-box'>alloted time pomodoroed</div>
      <div className='music-player'>music</div>
      <div className='timer-box'>25:00</div>

      <div className='task-box'>      
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
      </div>

    </div>
  )
}

export default App