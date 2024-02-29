import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import { useMeetingContext } from "../../../store/MeetingContext";

export default function CalendarLarge({ customDate, newEvents }) {
  const { setShowMeet, searchQuery } = useMeetingContext();

  const [highlightedEvent, setHighlightedEvent] = useState(null);

  const calendarRef = useRef(null);
  const events = newEvents.map((meeting) => ({
    title: meeting.title,
    start: meeting.start,
    index: meeting.id,
    // backgroundColor: highlightedEvent === index ? "#66b2b2" : "#3788d8",
    borderColor: highlightedEvent === meeting.id ? "#3788d8" : "#66b2b2",
    classNames: highlightedEvent === meeting.id ? "selected-event" : "",
  }));

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
    }
  }, [customDate]);

  useEffect(() => {
    if (searchQuery === "") {
      setHighlightedEvent(null);
      return;
    }

    const foundEvent = events.find((event) => event.index === searchQuery);

    if (foundEvent) {
      setHighlightedEvent(foundEvent.index);
      if (calendarRef.current) {
        calendarRef.current.getApi().gotoDate(foundEvent.start);
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
          initialView="listMonth"
          height="100%"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "listMonth",
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
