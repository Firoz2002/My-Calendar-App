import React from "react";
import { useState } from "react";

import '../App.css'
import EventForm from "./EventForm";

const Event = (props) => {

    const [close, open] = useState(false);

    //This function controls the Event-Form popup
    function togglePopup() {
        open(!close);
    }


    //This function deletes a by comparing it's title form the events array
    const deleteEventHandler = () => {
        const newEventsArray = [];

        props.eventsArray.forEach(event => {
            if(event.title !== props.event.title) {
                newEventsArray.push(event);
            }
        });

        localStorage.setItem(props.date, JSON.stringify(newEventsArray));
    }

    return (
        <div className="event"> 
            <div className="event-header"> 
                <div> <h2> {props.event.title}</h2> </div>
                <div> {props.event.type} </div>
            </div>

            <div className="event-body">
                <p> {props.event.description}</p>
            </div> 

            <div className="event-footer">
                <button className="btn-success btn" onClick={togglePopup}> Edit </button>
                {close ? <EventForm toggle={togglePopup} date={props.date} event={props.event} toDo={"editEvent"}/> : null}
                <button className="btn-danger btn" onClick={deleteEventHandler} > Delete </button>
            </div>
        </div>
    )
}

export default Event;