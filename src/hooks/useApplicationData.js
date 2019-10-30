import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day}));

  useEffect(() => {
    Promise.all([
      axios.get("api/days"),
      axios.get("api/appointments"),
      axios.get("api/interviewers")
    ]).then(all => {
      
      const [first, second, third] = all;
      setState(prev => ({...prev, days: first.data, appointments: second.data, interviewers: third.data }))
      console.log(first.data, second.data, third.data);
    });
  }, [])

  const bookInterview = function(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState(prev => ({...prev, appointments: appointments}))
    
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
      setState(prev => ({...prev, appointments: appointments}))
    });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}