import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

//importing from store
import { useMeetingContext } from "../../store/MeetingContext";

//right part event display component on the homescreen
export default function CalendarLarge({ customDate, newEvents }) {
  const { setShowMeet, searchQuery } = useMeetingContext();

  const [highlightedEvent, setHighlightedEvent] = useState(null);

  //ref for calendar to mutate some values
  const calendarRef = useRef(null);

  //events array to display in the event list
  const events = newEvents.map((meeting) => ({
    title: meeting.title,
    start: meeting.start,
    index: meeting.id,
    // backgroundColor: highlightedEvent === index ? "#66b2b2" : "#3788d8",
    borderColor: highlightedEvent === meeting.id ? "#3788d8" : "#66b2b2",
    classNames: highlightedEvent === meeting.id ? "selected-event" : "",
  }));

  //this useEffect is used to navigate this full calendar using the left small calendar
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().gotoDate(customDate);
    }
  }, [customDate]);

  // this useEffect is used when a event is clicked from search bar suggestion from the left part, then the right event list display the selected event from the search bar
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
      {/* using fullcalendar library */}
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
