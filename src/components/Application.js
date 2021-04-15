import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import DayList from './DayList';
import Appointment from './Appointment';
import getAppointmentsForDay from '../helpers/selectors';

export default function Application(props) {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}

  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysURL = '/api/days';
    const appointmentURL = '/api/appointments';
    const interviewersURL = '/api/interviewers';

    const dayPromise = axios.get(daysURL);
    const appointmentPromise = axios.get(appointmentURL);
    const interviewersPromise = axios.get(interviewersURL);

    Promise.all([dayPromise, appointmentPromise, interviewersPromise])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))

    })

  }, []
  )

  console.log('state.interviewers', state.interviewers);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map(appointment => {
    // const interview = getInterview(state, appointment.interview);

    return  (
    <Appointment
     key={appointment.id}
     id={appointment.id}
     time={appointment.time}
     interview={interview} />
     )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      
        </section>
      <section className="schedule">
       {schedule}
       <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
