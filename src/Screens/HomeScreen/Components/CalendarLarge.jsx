import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import { useMeetingContext } from "../../../store/MeetingContext";

export default function CalendarLarge({ customDate }) {
  const { meetingData, setShowMeet, searchQuery } = useMeetingContext();

  const [highlightedEvent, setHighlightedEvent] = useState(null);

  const calendarRef = useRef(null);
  const events = meetingData.map((meeting, index) => ({
    title: `${meeting.name} by ${meeting.documenter}`,
    start: meeting.date,
    end: meeting.date,
    index: index,
    backgroundColor: highlightedEvent === index ? "#66b2b2" : "#3788d8",
  }));

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
    }
  }, [customDate]);

  useEffect(() => {
    if (searchQuery !== "") {
      const isNumeric = !isNaN(searchQuery);

      const foundEvent = events.find((event) =>
        isNumeric
          ? event.index === parseInt(searchQuery)
          : event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (foundEvent) {
        setHighlightedEvent(foundEvent.index);

        if (calendarRef.current) {
          // calendarRef.current.getApi().changeView("listMonth");
          calendarRef.current.getApi().gotoDate(foundEvent.start);
        }
      } else {
        setHighlightedEvent(null);
      }
    } else {
      setHighlightedEvent(null);
    }
  }, [searchQuery, events]);

  const handleEventClick = (info) => {
    setShowMeet(info.event._def.extendedProps.index);
  };

  return (
    <div className="w-full">
      {
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          height="100%"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth, timeGridWeek, timeGridDay, listMonth",
          }}
          events={events}
          eventBackgroundColor="#66b2b2"
          eventBorderColor="#66b2b2"
          eventClick={handleEventClick}
        />
      }
    </div>
  );
}
