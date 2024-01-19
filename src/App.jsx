import { useEffect, useState } from "react";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import MeetingDetailsPage from "./Screens/DetailScreen/MeetingDetailsPage";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [meetingData, setMeetingData] = useState([]);

  useEffect(() => {
    fetchMeetingdata();
  }, []);

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
      setMeetingData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const meetingDataWithId = meetingData.map((meeting, index) => {
    return {
      id: index,
      data: meeting,
    };
  });

  const newEvents = meetingDataWithId.map((meeting) => {
    return {
      id: meeting?.id,
      title: `${
        meeting ? meeting.data.summary.meetingInfo.name : "Meeting"
      } by ${
        meeting ? meeting.data.summary.meetingInfo.documenter : "Unknown"
      }`,
      start: `${
        meeting ? meeting.data.summary.meetingInfo.date : "2020-02-29"
      }`,
    };
  });

  const [eventDetail, setEventDetail] = useState([]);

  function handleEventClick(id) {
    setEventDetail(meetingDataWithId[id]);
    navigate("/details");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            newEvents={newEvents}
            handleEventClick={handleEventClick}
          />
        }
      />
      <Route
        path="/details"
        element={<MeetingDetailsPage eventDetail={eventDetail} />}
      />
    </Routes>
  );
}

export default App;
