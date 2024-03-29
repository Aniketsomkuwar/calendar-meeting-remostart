import { useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

// importing from pages
import HomeScreen from "./pages/HomeScreen";
import MeetingDetailsPage from "./pages/MeetingDetailsPage";
//importing from store
import { useMeetingContext } from "./store/MeetingContext";

// calling api from .env.local
const API = import.meta.env.VITE_REACT_APP_API;

// app component
function App() {
  const { meetingData, setMeetingData, showMeet } = useMeetingContext();

  // suffix removal function like 'st', 'nd'  eg: 1st => 1, 2nd => 2
  const removeSuffix = (dateString) => {
    return dateString.replace(/(\d+)(st|nd|rd|th)/, "$1");
  };

  //fetching the data from api and cleaning it
  useEffect(() => {
    const fetchMeetingdata = async () => {
      try {
        const response = await axios.get(API);

        const convertedData = response.data.data.slice(1).map((meeting) => {
          const date = meeting.MeetingDate;
          const minutesBy = meeting.MinutesBy;
          const present = meeting.Present?.split(",")?.map((attendee) =>
            attendee.trim()
          );
          const apologies = meeting.Apologies;
          const agendaItems = meeting["Agenda items"];
          const keyDiscussionPoints = meeting["Key discussion points"];
          const decisions = meeting.Decisions;
          const laterChanges = meeting["Any later changes?"];
          const actionItems = meeting["Action items"];
          const actionItemDone = meeting["Action item done?"];
          const outcomes =
            meeting["Outcomes and any further action items arising?"];
          const ideasForDiscussion =
            meeting["Ideas that need further discussion"];

          return {
            date,
            minutesBy,
            present,
            apologies,
            agendaItems,
            keyDiscussionPoints,
            decisions,
            laterChanges,
            actionItems,
            actionItemDone,
            outcomes,
            ideasForDiscussion,
          };
        });
        setMeetingData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetingdata();
  }, [setMeetingData]);

  //making a new array called "newEvents to assign it a id and pass it in event list"
  const newEvents = meetingData.map((meeting, index) => {
    return {
      id: index,
      agenda: `${meeting ? meeting.agendaItems : ""}`,
      title: `Minutes by ${meeting ? meeting.minutesBy : "Unknown"}`,
      present: `${meeting ? meeting.present : "Unknown"}`,
      start: `${
        meeting
          ? dayjs(removeSuffix(meeting.date)).format("YYYY-MM-DD")
          : "2020-02-29"
      }`,
      keyDiscussionPoints: `${
        meeting ? meeting.keyDiscussionPoints : "Unknown"
      }`,
    };
  });

  //displaying the component conditionally based on event click
  return (
    <>
      {showMeet === null && <HomeScreen newEvents={newEvents} />}
      {showMeet !== null && (
        <MeetingDetailsPage meetingData={meetingData[showMeet]} />
      )}
    </>
  );
}

export default App;
