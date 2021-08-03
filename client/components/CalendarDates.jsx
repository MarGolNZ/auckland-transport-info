import React, { useState } from 'react'
import { getDatesByService } from '../api'
import moment from 'moment'
import Calendar from 'react-calendar'

export default function CalendarDates() {
    const [calendar, setCalendar] = useState([])
    const [date, setDate] = useState(new Date())

    const changeDate = (e) => {
        setDate(e)
    }

    function displayCalendarDates(evt) {
        evt.preventDefault()
        getDatesByService()
            .then(dates => {
                console.log(dates.response[0])
                setCalendar(dates.response.map((date, i) => <li key={i}>{moment(date.date).format('MMMM Do YYYY').sort(function (a, b) { //convert date to timestamp and sort
                    a = a.split('').reverse().join('')
                    b = b.split('').reverse().join('')
                    return a > b ? 1 : a < b ? -1 : 0
                })}</li>))
            })
    }

    return (
        <div className='calendar-dates'>
            <button onClick={displayCalendarDates}>Show Calendar Dates by Service</button>
            <Calendar
                value={date}
                onChange={changeDate}
            />
            <p>Current selected date is <b>{moment(date).format('MMMM Do YYYY')}</b></p>
            <ul>{calendar}</ul>
        </div>
    )
}