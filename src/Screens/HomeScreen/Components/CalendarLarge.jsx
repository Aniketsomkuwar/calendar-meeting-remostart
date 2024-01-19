import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import { useMeetingContext } from '../../../store/MeetingContext';

export default function CalendarLarge({ customDate }) {
  const { meetingData,setShowMeet } = useMeetingContext();
  

  const calendarRef = useRef(null);
  const events = meetingData.map((meeting,index) => ({
    title: `${meeting.name} by ${meeting.documenter}`,
    start: meeting.date,
    end: meeting.date, 
    index:index
  }));
  console.log(events)

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
    }

  }, [customDate]);

  

   const handleEventClick = (info) => {
     setShowMeet(info.event._def.extendedProps.index);
  };



  return (
    <div className="w-full">
      { <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        height="100%"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth, timeGridWeek, timeGridDay, listWeek",
        }}
        events={events}
        eventBackgroundColor="#66b2b2"
        eventBorderColor="#66b2b2"
        eventClick={handleEventClick}
        
      />}

  
    </div>
  );
}
