export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_DAYS = "SET_DAYS";
export const UPDATE_INTERVIEW = "UPDATE_INTERVIEW";


export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value}
    case SET_APPLICATION_DATA:
      return { ...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers }
    case SET_INTERVIEW: {
      return { ...state, appointments: action.value }
    }
    case UPDATE_INTERVIEW:
      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview && {...action.value.interview}
      };
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };


      /////////
      //ADDIN//
      const tempState = {...state, appointments: appointments};

      let appointId = action.value.id;
      //find the day of the week the appointment is on
      const dayToModify = tempState.days.filter((day) => {
        return day.appointments.includes(appointId);
      })[0];
      const numSpots = dayToModify.appointments.reduce((acc, curr) => tempState.appointments[curr].interview ? acc : acc +=1, 0);
      const modifiedDay = {...dayToModify, spots: numSpots};
      let modifiedDays = [...tempState.days];
      modifiedDays[dayToModify.id - 1] = modifiedDay;

      return {...tempState, days: modifiedDays};
      //ADDING//
      //////////
      // return {...state, appointments: appointments}

    case SET_DAYS:
      return { ...state, days: action.value}
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}