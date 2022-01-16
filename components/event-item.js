import React from 'react'
import classes  from './event-item.module.css'
import DateIcon from './icons/date-icon'
import AddressIcon from './icons/address-icon'
import ArrowRightIcon from './icons/arrow-right-icon'
import Button from './ui/Button'

const EventItem = ({ event }) => {
    const formattedAddress = event.location.replace(', ', '\n')
    const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const exploreLink = '/events/' + event.id;
    return (
        <li className={classes.item}>
      <img src={'/' + event.image} alt={event.title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
    )
}

export default EventItem
