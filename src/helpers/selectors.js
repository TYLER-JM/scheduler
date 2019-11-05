
export function getAppointmentsForDay(state, day) {
  let selectedDay = state.days.filter(d => d.name === day)[0];
  let daysApts = [];

  if (selectedDay) {
    for (let apt in state.appointments) {
      if (selectedDay.appointments.includes(state.appointments[apt].id)) {
        daysApts.push(state.appointments[apt]);
      }
    }
  }
  return daysApts;

};


export function getInterviewersForDay(state, day) {
  let selectedDay = state.days.filter(d => d.name === day)[0];
  let daysInts = [];

  if (selectedDay) {
    for (let int in state.interviewers) {
      if (selectedDay.interviewers.includes(state.interviewers[int].id)) {
        daysInts.push(state.interviewers[int]);
      }
    }
  }
  return daysInts;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student: interview.student,
    interviewer: {
      id: state.interviewers[interview.interviewer].id,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar,
    }
  }
};

