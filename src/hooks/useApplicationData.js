import {useEffect, useReducer} from "react";
import axios from "axios";


export default function useApplicationData() {

  //////////////////
  ////USEREDUCER////


  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const SET_DAYS = "SET_DAYS"

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value}
      case SET_APPLICATION_DATA:
        return { ...state, days: action.value.days, appointments: action.value.appointments, interviewers: action.value.interviewers }
      case SET_INTERVIEW: {
        return { ...state, appointments: action.value }
      }
      case SET_DAYS:
        return { ...state, days: action.value}
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({type: SET_DAY, value: day})


  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then(all => {
      
      const [first, second, third] = all;
      dispatch({type: SET_APPLICATION_DATA, value: {days: first.data, appointments: second.data, interviewers: third.data}})
      console.log(first.data, second.data, third.data);
    });
  }, [])

  useEffect(() => {
    axios.get("api/days")
      .then((res) => dispatch({type: SET_DAYS, value: res.data}))
  }, [state.days])


  const bookInterview = function(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({type: SET_INTERVIEW, value: appointments})
    
    return axios.put(`api/appointments/${id}`, appointment);
  };
  
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios.delete(`api/appointments/${id}`).then(() => {
      dispatch({type: SET_INTERVIEW, value: appointments})
    });
  };


  ////USEREDUCER///
  /////////////////

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}