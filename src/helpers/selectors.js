export function getAppointmentsForDay(state, day) {
  const dayData = state.days.filter(dayObj => dayObj.name === day)

  if (!dayData[0]) {
    return [];
  }

  return dayData[0].appointments.map(appointment => state.appointments[appointment])
}