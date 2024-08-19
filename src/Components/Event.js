import React from "react";
import { useState, useContext } from "react";

import '../App.css'
import EventForm from "./EventForm";
import { EventsContext } from '../utils/EventsContext';

const Event = (props) => {

    const [close, open] = useState(false);
    const {events, setEvents} = useContext(EventsContext);

    //This function controls the Event-Form popup
    function togglePopup() {
        open(!close);
    }


    //This function deletes a by comparing it's title from the events array.
    const deleteEventHandler = () => {
        try {
            const newEventsArray = [];

            events.forEach(event => {
                if(event.title !== props.event.title) {
                    newEventsArray.push(event);
                }
            });
            setEvents(newEventsArray);
            localStorage.setItem(props.date, JSON.stringify(newEventsArray));
            
        } catch (error) {
            console.error("Some error occured while deleting event: ", error);
        }
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