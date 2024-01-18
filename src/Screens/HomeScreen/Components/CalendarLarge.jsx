import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";

export default function CalendarLarge({ customDate, handleCustomDate }) {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
      const api = calendarRef.current.getApi();
      const onDatesSet = (info) => {
        handleCustomDate(new Date(Date.parse(info.view.title)));
      };

      api.on("datesSet", onDatesSet);

      return () => {
        api.off("datesSet", onDatesSet);
      };
    }
  }, [customDate, handleCustomDate]);

  const [events, setEvents] = useState([
    {
      title: "event1",
      start: "2024-01-01",
    },
    {
      title: "event11",
      start: "2024-01-01",
    },
    {
      title: "event12",
      start: "2024-01-01",
    },
    {
      title: "event13",
      start: "2024-01-01",
    },
    {
      title: "event2",
      start: "2024-01-08",
      end: "2024-01-10",
    },
  ]);

  return (
    <div className="w-full">
      <FullCalendar
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
      />
    </div>
  );
}
