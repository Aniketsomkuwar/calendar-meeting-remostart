import React, {  useEffect } from 'react';
import axios from "axios";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import MeetingDetailsPage from "./Screens/DetailScreen/MeetingDetailsPage";
import { useMeetingContext } from './store/MeetingContext';


function App() {

  const { meetingData, setMeetingData,showMeet } = useMeetingContext();

  useEffect(() => {
    const fetchMeetingdata = async () => {
      const SERVER_API_URI =
        "https://archive-oracle.netlify.app/api/getMeetingSummaries";
      const API_KEY = "bht409534jgerg4t4e8ge4gf8f3f3fsg";
  
      try {
        const response = await axios.get(SERVER_API_URI, {
          headers: {
            api_key: API_KEY,
          },
        });
        
          // console.log(response.data.data[0])
          const convertedData = response.data.data.map((meeting) => {
            const meetingInfo = meeting.summary.meetingInfo;
          
  
            const date = meetingInfo.date;
            const name = meetingInfo.name;
            const host = meetingInfo.host;
            const documenter = meetingInfo.documenter;
            const attendees = meetingInfo.peoplePresent.split(',').map((attendee) => attendee.trim());
            const agendaItems = meeting.summary.agendaItems.map((item) => item.issues).flat();
            const keyDiscussionPoints = meeting.summary.agendaItems.map((item) => item.discussionPoints).flat();
            const decisions = meeting.summary.agendaItems.map((item) => item.decisionItems.map((decision) => decision.decision)).flat();
            const actionItems = meeting.summary.agendaItems.map((item) => item.actionItems.map((action) => ({ task: action.text, done: action.status === 'in progress' || action.status === 'done' }))).flat();
            const outcomes = meeting.summary.agendaItems.map((item) => item.learningPoints).flat();
  
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
          setMeetingData(convertedData);
        

      } catch (error) {
        console.log(error);
      }
    };
    fetchMeetingdata();
  }, []);

  return (
    <>
      {showMeet===null && <HomeScreen />}
      {showMeet!==null && <MeetingDetailsPage meetingData={meetingData[showMeet]} />}
    </>
  );
}

export default App;
