import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import { collection, addDoc, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { formatISO } from "date-fns";

export default function CalendarPage(){
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    const q = collection(db, "calendarEvents");
    const unsub = onSnapshot(q, snapshot=>{
      const evs = snapshot.docs.map(d=>({ id: d.id, ...d.data() }));
      setEvents(evs);
    });
    return ()=>unsub();
  },[]);

  async function handleDateSelect(selectInfo){
    const title = prompt("Event title");
    if(!title) return;
    const newEvent = {
      title,
      start: formatISO(selectInfo.start),
      end: selectInfo.end ? formatISO(selectInfo.end) : null,
      createdBy: "sam-or-leah",
      color: "#2b8cff"
    };
    await addDoc(collection(db, "calendarEvents"), newEvent);
  }

  async function handleEventClick(info){
    if(window.confirm(`Delete event "${info.event.title}"?`)){
      await deleteDoc(doc(db, "calendarEvents", info.event.id));
    }
  }

  function mapEvent(e){
    const evt = {
      id: e.id,
      title: e.title,
      start: e.start,
      end: e.end,
      color: e.color
    };
    if(e.rrule) evt.rrule = e.rrule;
    return evt;
  }

  return (
    <div className="app-shell">
      <NavBar />
      <div style={{padding:20}}>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          selectable={true}
          select={handleDateSelect}
          events={events.map(mapEvent)}
          eventClick={handleEventClick}
          height="auto"
        />
      </div>
    </div>
  );
}