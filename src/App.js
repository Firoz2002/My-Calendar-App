import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';

import './App.css';
import 'react-calendar/dist/Calendar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Event from "./Components/Event";
import EventForm from "./Components/EventForm";

function App() {

  const [close, open] = useState(false);
  const [eventsArray, setEventsArray] = useState([]);
  const [currentDate, selectedDate] = useState(new Date());


  //Executes everytime user clicks a date
  const dateChangeHandler = (date) => {
    selectedDate(date);

    //This prevent re-rendering of same events if user clicks on same date twice or more.
    if(currentDate !== date) {
      const eventsArray = JSON.parse(localStorage.getItem(date));

      if(eventsArray) {
          setEventsArray(eventsArray);
      } else {
          setEventsArray([]);
      }
    }
  }

  //This functions filters events based on type 
  const eventTypeHandler = (e) => {
      const originalEventsArray = JSON.parse(localStorage.getItem(currentDate));
      const filteredEventsArray = [];

      originalEventsArray.forEach(event => {
          if(event.type === e.target.value || e.target.value === "All") {
              filteredEventsArray.push(event);
          }
      });
      setEventsArray(filteredEventsArray);
  }

  //This function controls the Event-Form popup
  function togglePopup() {
      open(!close);
  }

  return (
    <div className="App">

      <div className="App-header">
        <nav className="navbar">
            <h1> My-Calendar-App </h1>
        </nav>
      </div>

      <div className="App-body">
        <div className="container-fluid">
          <div className="row gx-1">

            <div className="calendar-container col-md-6">
              <div className="calendar">
                <Calendar onClickDay={dateChangeHandler} onChange={selectedDate} value={currentDate} />
              </div>
            </div>

            <div className="events-container col-md-6">
              <div className="events-header">
                <div>
                  <h1> Events: </h1>
                </div>
                <div className="event-type">
                  <label> Event-Type </label>
                  <select className="event-type-selector event-type" onChange={eventTypeHandler}>
                    <option value={"All"} defaultValue={"All"}> All </option>
                    <option value={"Personal"}> Personal </option>
                    <option value={"Professional"}> Professional </option>
                    <option value={"Other"}> Other </option>
                  </select>
                </div>
              </div>

              <div className="events-body">
                {eventsArray && eventsArray.length ?
                  eventsArray.map((event, index) => { 
                    return <Event date={currentDate} event={event} key={index} eventsArray={eventsArray}/>
                  })
                : null}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="App-footer">
        <div className="create-event">
          <button className="create-event-btn wrapper" onClick={togglePopup}> + </button>
          {close ? <EventForm toggle={togglePopup} date={currentDate} event={{}} toDo="createEvent" /> : null}
        </div>
      </div>

    </div>
  );
}

export default App;
