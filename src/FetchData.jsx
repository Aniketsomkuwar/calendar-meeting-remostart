import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const FetchData = () => {
  const [meetingData, setMeetingData] = useState({});

  useEffect(() => {
    fetchMeetingdata();
  }, []);

  console.log(meetingData);

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
      setMeetingData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Building in Progress</div>
    </>
  );
};

export default FetchData;
