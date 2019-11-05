import {useEffect, useReducer, useRef} from "react";
import axios from "axios";

import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAYS, UPDATE_INTERVIEW } from "../reducers/application";


export default function useApplicationData() {

  const socket = useRef();
  

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({type: SET_DAY, value: day})


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      
      const [first, second, third] = all;
      dispatch({type: SET_APPLICATION_DATA, value: {days: first.data, appointments: second.data, interviewers: third.data}})
      // console.log(first.data, second.data, third.data);
    });
  }, [])

  useEffect(() => {
    axios.get("/api/days")
      .then((res) => dispatch({type: SET_DAYS, value: res.data}))

  }, [state.appointments])

  
  useEffect(() => {
    socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.current.onopen = () => {
      socket.current.send("ping");
      socket.current.onmessage = function(event){
        let parsed = JSON.parse(event.data);
        if (parsed.type === "SET_INTERVIEW") {
          console.log("WE GOT A PACKAGE INCOMING HERE!");
          console.log("parsed: ", parsed);

          /////////
          //ADDED//

          // const appointment = {
          //   ...state.appointments[parsed.id],
          //   interview: {...parsed.interview}
          // };
          // const appointments = {
          //   ...state.appointments,
          //   [parsed.id]: appointment
          // };
          // console.log("APPOINTMENTS: ", appointments)

          //to UPDATE_INTERVIEW with value: parsed
          dispatch({type: UPDATE_INTERVIEW, value: parsed});
          // dispatch({type: SET_INTERVIEW, value: appointments});

          //ADDED//
          /////////

        }
        // console.log("Message: ", event.data);
      }
    }

    return () => {
      socket.current.close()
    }
  },[])


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
    
    return axios.put(`/api/appointments/${id}`, appointment);
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
    return axios.delete(`/api/appointments/${id}`).then(() => {
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