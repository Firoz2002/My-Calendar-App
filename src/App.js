import React from 'react';
import { useState, useContext } from 'react';
import Calendar from 'react-calendar';

import './App.css';
import 'react-calendar/dist/Calendar.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Event from "./Components/Event";
import EventForm from "./Components/EventForm";
import { EventsContext } from './utils/EventsContext';

function App() {

  const {events, setEvents} = useContext(EventsContext);

  const [close, open] = useState(false);
  const [currentDate, selectedDate] = useState(new Date());


  //Executes everytime user clicks a date
  const dateChangeHandler = (date) => {
    try {
      selectedDate(date);

      //This prevent re-rendering of same events if user clicks on same date twice or more.
      if(currentDate !== date) {
        const eventsArray = JSON.parse(localStorage.getItem(date));

        if(eventsArray) {
            setEvents(eventsArray);
        } else {
            setEvents([]);
        }
      }

    } catch (error) {
      console.error("Some error occured while changing dates: ", error);
    }
  }

  //This functions filters events based on their type 
  const filterEventHandler = (e) => {
      try {
        const originalEventsArray = JSON.parse(localStorage.getItem(currentDate));
        const filteredEventsArray = [];

        if(originalEventsArray) {
          originalEventsArray.forEach(event => {
            if(event.type === e.target.value || e.target.value === "All") {
                filteredEventsArray.push(event);
            }
          });
          setEvents(filteredEventsArray);
        }

      } catch (error) {
        console.error("Some error occured while filtering events: ", error);
      }
  }

  //This function controls the Event-Form popup
  function togglePopup() {
      open(!close);
  }

  return (
    <div className="App">

      <div className="App-header">
        <nav className="navbar">
            <div className="logo">
              <img src="https://res.cloudinary.com/dhlsmeyw1/image/upload/v1724009747/timetable_1048953_1_iswdjp.png" alt="logo"/>
              <h1> My-Calendar </h1>
            </div>
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
                  <select className="event-type-selector" onChange={filterEventHandler}>
                    <option value={"All"} defaultValue={"All"}> All </option>
                    <option value={"Personal"}> Personal </option>
                    <option value={"Professional"}> Professional </option>
                    <option value={"Other"}> Other </option>
                  </select>
                </div>
              </div>

              <div className="events-body">
                {events && events.length ?
                  events.map((event, index) => { 
                    return <Event date={currentDate} event={event} key={index}/>
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
