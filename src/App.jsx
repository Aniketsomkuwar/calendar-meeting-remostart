import { useEffect, useState } from "react";
import axios from "axios";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import MeetingDetailsPage from "./Screens/DetailScreen/MeetingDetailsPage";
import { useMeetingContext } from "./store/MeetingContext";

function App() {
  const { meetingData, setMeetingData, showMeet } = useMeetingContext();

  const [dataForAside, setDataForAside] = useState([]);

  useEffect(() => {
    const fetchMeetingdata = async () => {
      const SERVER_API_URI =
        "https://archive-oracle.netlify.app/api/getMeetingSummaries";
      const API_KEY = API_KEY;

      try {
        const response = await axios.get(SERVER_API_URI, {
          headers: {
            api_key: API_KEY,
          },
        });

        console.log(response.data.data);
        const convertedData = response.data.data.map((meeting) => {
          const meetingInfo = meeting.summary.meetingInfo;

          const date = meetingInfo.date;
          const name = meetingInfo.name;
          const host = meetingInfo.host;
          const documenter = meetingInfo.documenter;
          const attendees = meetingInfo.peoplePresent
            ?.split(",")
            ?.map((attendee) => attendee.trim());
          const agendaItems = meeting.summary.agendaItems
            ?.map((item) => item.issues)
            .flat();
          const keyDiscussionPoints = meeting.summary.agendaItems
            ?.map((item) => item.discussionPoints)
            .flat();
          const decisions = meeting.summary.agendaItems
            ?.map((item) =>
              item.decisionItems?.map((decision) => decision.decision)
            )
            .flat();
          const actionItems = meeting.summary.agendaItems
            ?.map((item) =>
              item.actionItems?.map((action) => ({
                task: action?.text,
                status: action?.status,
                icon:
                  (action.status === "in progress" && "🚧") ||
                  (action.status === "done" && "✅") ||
                  (action.status === "todo" && "📝"),
              }))
            )
            .flat();
          const outcomes = meeting.summary.agendaItems
            ?.map((item) => item.learningPoints)
            .flat();

          return {
            date,
            name,
            host,
            documenter,
            attendees,
            agendaItems,
            keyDiscussionPoints,
            decisions,
            actionItems,
            outcomes,
          };
        });
        console.log(response.data.data);
        setDataForAside(response.data.data);
        setMeetingData(convertedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetingdata();
  }, [setMeetingData]);

  const meetingDataWithId = dataForAside.map((meeting, index) => {
    return {
      id: index,
      data: meeting,
    };
  });

  const newEvents = meetingDataWithId.map((meeting) => {
    return {
      id: meeting?.id,
      agenda: `${
        meeting.data.summary.agendaItems
          ? meeting.data.summary.agendaItems
              .map((item) => (item.agenda ? item.agenda : ""))
              .join(", ")
          : ""
      }`,
      title: `${
        meeting ? meeting.data.summary.meetingInfo.name : "Meeting"
      } by ${
        meeting ? meeting.data.summary.meetingInfo.documenter : "Unknown"
      }`,
      present: `${
        meeting ? meeting.data.summary.meetingInfo.peoplePresent : "Unknown"
      }`,
      start: `${
        meeting ? meeting.data.summary.meetingInfo.date : "2020-02-29"
      }`,
    };
  });
  console.log(newEvents);

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
