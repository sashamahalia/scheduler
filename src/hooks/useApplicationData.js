import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}

  })

  // const updateSpots = function (dayName, days, appointments) {

  //   const day = days.filter(day => day.name === dayName)[0];
  //   let spotsFilled = 0;
  //   for (const id of day.appointments) {
  //     if (appointments[id].interview) {
  //       spotsFilled++
  //     }
  //   }
  //   const spotsLeft = 5 - spotsFilled;

  //   const newDays = [...days]
  //   for (const newDay of newDays) {
  //     if (newDay.name === dayName) {
  //       newDay.spots = spotsLeft;
  //     }
  //   }

  //   setState(prev => {
  //     return {
  //       ...prev,
  //       newDays
  //     }
  //   })

  // };

  const getSpotsForDay = (dayObj, appointments) => {
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      !appointment.interview && spots++;
    }
    return spots;
  }
  
  const updateSpots = (dayName, days, appointments) => {
  
    //find the day object
    const dayObj = days.find(day => day.name === dayName)
  
    //calculates how many spots are left in the day
    const spots = getSpotsForDay(dayObj, appointments);
  
    const newDay = {...dayObj, spots};
  
    //returns updated spots if the day matches, otherwise returns unchanged day
    const newDays = days.map(day => day.name === dayName ? newDay : day);
    return newDays;
  }

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => {
      return {...prev, appointments}
    });
    
    const updatedSpots = updateSpots(state.day, state.days, appointments)

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => setState(prev => {
        return {
          ...prev,
          updatedSpots
        }
      }
    ))
  }

  function cancelInterview(id) {
    const interview = {...state.appointments[id].interview}

    const newAppointments = {...state.appointments};
    newAppointments[id].interview = null;
    setState(prev => {
      return {...prev, newAppointments}});

      const updatedSpots = updateSpots(state.day, state.days, newAppointments);

    return axios.delete(`/api/appointments/${id}`, { interview })
      .then(() => setState(prev => {
        return {
          ...prev,
          updatedSpots
        }
      }
    ));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }


}