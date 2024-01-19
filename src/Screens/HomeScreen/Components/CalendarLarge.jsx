import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef } from "react";

export default function CalendarLarge({
  customDate,
  newEvents,
  handleEventClick,
}) {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
    }
  }, [customDate]);

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
          end: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
        }}
        events={newEvents}
        eventBackgroundColor="#66b2b2"
        eventBorderColor="#66b2b2"
        eventClick={(info) => handleEventClick(info.event.id)}
      />
    </div>
  );
}
