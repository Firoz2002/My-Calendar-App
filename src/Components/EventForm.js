import React from "react";
import { useState } from "react";

import '../App.css';

const EventForm = (props) => {

    const [eventType, setEventType] = useState(props.event.type || "");
    const [eventTitle, setEventTitle] = useState(props.event.title || "");
    const [eventDescription, setEventDescription] = useState(props.event.description || "");
    const oldEvent = props.event;

    //Handles Form Submission
    const handleEventForm = (event) => {
        event.preventDefault();
        props.toggle();

        //If it's is a new event
        if(props.toDo === "createEvent") {
            const newEvent = {
                date: props.date,
                title: eventTitle,
                description: eventDescription,
                type: document.querySelector('.event-type-selector-form').value
            }
    
            //If events array already exist append the new event, else make one
            if(localStorage.getItem(props.date)) {
    
                const eventsArray = JSON.parse(localStorage.getItem(props.date));
                eventsArray.push(newEvent);
    
                localStorage.setItem(props.date, JSON.stringify(eventsArray));
    
            } else {
                const eventsArray = [];
                eventsArray[0] = newEvent;
    
                localStorage.setItem(props.date, JSON.stringify(eventsArray));
            }


        //If user wants to upadate a pre-existing event
        } else if(props.toDo === "editEvent") {
            const eventsArray = JSON.parse(localStorage.getItem(props.date));

            eventsArray.forEach(event => {
                if(event.title === oldEvent.title) {
                    event.type = eventType;
                    event.title = eventTitle;
                    event.description = eventDescription;
                }
            });
            localStorage.setItem(props.date, JSON.stringify(eventsArray));
        }
    }
   
    return (
        <div>
            <div className="wrapper">
                <div className="popup">
                    <div className="popup-inner container">
                        <div className="form-container sign-in-container">

                            <form onSubmit={handleEventForm}>

                                <h2>Create Event</h2>

                                <input type="text" placeholder="Enter event title...." value={eventTitle} onChange={e => setEventTitle(e.target.value)}/>

                                <textarea type="text" placeholder="Enter event description....." value={eventDescription} onChange={e => setEventDescription(e.target.value)}/>
                                
                                <div className="event-type" onChange={e => setEventType(e.target.value)}>
                                    <label> Event-Type </label>
                                    <select className="event-type-selector-form">
                                        <option value={"Personal"} defaultValue={"Personal"}> Personal </option>
                                        <option value={"Professional"}> Professional </option>
                                        <option value={"Other"}> Other </option>
                                    </select>
                                </div>

                                <div>
                                    <button onClick={e => props.toggle()} className="btn-danger btn"> Cancel </button>
                                    <button type="submit" className="btn-success btn"> Submit </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default EventForm;