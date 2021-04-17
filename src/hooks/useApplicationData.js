import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function useApplicationData() {

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    setState({...state, appointments});
    return axios.put(`api/appointments/${id}`, { interview })
  }

  function cancelInterview(id) {
    const interview = {...state.appointments[id].interview}
    setState({...state, interview});
    return axios.delete(`api/appointments/${id}`, { interview })
     
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }


}