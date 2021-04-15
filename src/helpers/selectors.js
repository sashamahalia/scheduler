function getAppointmentsForDay(state, day) {
  const [dayData] = state.days.filter(dayObj => dayObj.name === day)

  if (!dayData) {
    return [];
  }

  return dayData.appointments.map(appointment => state.appointments[appointment])
}

function getInterview(state, interviewers) {
  let interviewer = {};

  if (!interviewers) {
    return null;
  }
  
  for (const key in state.appointments) {
    if (state.interviewers[key] && (state.interviewers[key].id ===  interviewers.interviewer)) {
      interviewer = {...state.interviewers[key]}
    }
  }

  return {student: interviewers.student,
    interviewer: interviewer
  };

}

export { getAppointmentsForDay, getInterview };
