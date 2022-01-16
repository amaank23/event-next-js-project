import React from 'react'
import EventItem from './event-item'
import classes from './event-list.module.css'

const EventList = ({ data }) => {
    return (
        <ul className={classes.events}>
            {data.map(event => (
                <EventItem key={event.id} event={event} />
            ))}
        </ul>
    )
}

export default EventList
