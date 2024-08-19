import { createContext, useState } from "react"

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {

    //This array contains collection of all events which occur on particular date.
    const [events, setEvents] = useState([]);

    return (
        <EventsContext.Provider value={{events, setEvents}}>
            {children}
        </EventsContext.Provider>
    );
};