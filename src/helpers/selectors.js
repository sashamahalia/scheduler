function getAppointmentsForDay(state, day) {
  const [dayData] = state.days.filter((dayObj) => dayObj.name === day);

  if (!dayData) {
    return [];
  }

  return dayData.appointments.map(
    (appointment) => state.appointments[appointment]
  );
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  // for (const key in state.appointments) {
  //   if (state.interviewers[key] && (state.interviewers[key].id ===  interviewers.interviewer)) {
  //     interviewer = {...state.interviewers[key]}
  //   }
  // }

  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer],
    }
  );
}

function getInterviewersForDay(state, day) {
  const [dayData] = state.days.filter((dayObj) => dayObj.name === day);

  if (!dayData) {
    return [];
  }

  return dayData.interviewers.map(
    (interviewer) => state.interviewers[interviewer]
  );
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
