export default function getAppointmentsForDay(state, day) {
  const [dayData] = state.days.filter(dayObj => dayObj.name === day)

  if (!dayData) {
    return [];
  }
  
  console.log(dayData.appointments.map(appointment => state.appointments[appointment]))
  return dayData.appointments.map(appointment => state.appointments[appointment])
}