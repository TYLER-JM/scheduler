
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

///////////////
/////NEW///////

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },
//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     },
//     "3": {
//       id: 5,
//       name: "Sven Jones",
//       avatar: "https://i.imgur.com/twYrpay.jpg"
//     },
//     "4": {
//       id: 4,
//       name: "Cohana Roy",
//       avatar: "https://i.imgur.com/FK8V841.jpg"
//     }
//   }
// };

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

////END////
///////////

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

// console.log(getAppointmentsForDay(state, "Tuesday"));
// console.log(getInterview(state, state.appointments["3"].interview));
// console.log(getInterviewersForDay(state, "Tuesday"));
