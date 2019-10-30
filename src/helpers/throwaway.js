const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [3, 4]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Sven Jones",
      avatar: "https://i.imgur.com/twYrpay.jpg"
    },
    "4": {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg"
    }
  }
};

function getInterviewersForDay(state, day) {
  let selectedDay = state.days.filter(d => d.name === day)[0];
  let daysInts = [];

  if (selectedDay) {
    for (let int in state.interviewers) {
      // console.log("selectedDay.interviewers-->", selectedDay.interviewers);
      if (selectedDay.interviewers.includes(state.interviewers[int].id)) {
        // console.log("found");
        daysInts.push(state.interviewers[int]);
      }
    }
  }
  return daysInts;
};

console.log(getInterviewersForDay(state, "Tuesday"));
