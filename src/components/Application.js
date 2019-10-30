import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
// import { isUserWhitespacable } from "@babel/types";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // const setDay = day => setState({ ...state, day });
  const setDay = day => setState(prev => ({ ...prev, day}));
  // const setDays = days => setState({ ...state, days});

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

  let appointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day);

   function bookInterview(id, interview) {
    // console.log(id, interview);

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
  }
  

  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
            className="sidebar-centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="seidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="lighthouse Labs"
          />
        
      </section>
      <section className="schedule">
      {appointments.map(appointment => {
        const interview = getInterview(state, appointment.interview)
        return (
        <Appointment
          key={appointment.id}
          // {...appointment}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
        />
        );
      })}     
   <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
