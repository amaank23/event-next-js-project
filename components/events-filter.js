import React, { useRef } from 'react'
import classes from './events-filter.module.css'
import Button from './ui/Button'

const EventsFilter = ({ eventsFilter }) => {
    const monthVal = useRef('');
    const yearVal = useRef('');
    function submitHandler(e){
        e.preventDefault();

        eventsFilter(monthVal.current.value, yearVal.current.value)
    }
    return (
        <form className={classes.form}  onSubmit={submitHandler}>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <label htmlFor="year">Year</label>
                    <select id="year" ref={yearVal}>
                        <option value="">Select</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
                <div className={classes.control}>
                    <label htmlFor="month">Month</label>
                    <select id="month" ref={monthVal}>
                        <option value="">Select</option>
                        <option value="1">January</option>
                        <option value="2">Febuary</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">Augest</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
            </div>
            <Button>Search</Button>
        </form>
    )
}

export default EventsFilter
