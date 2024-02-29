import { createContext, useContext, useState } from "react";

// Create a context
const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [meetingData, setMeetingData] = useState([]);
  const [showMeet, setShowMeet] = useState(null);
  const [inputValue, setInputValue] = useState("");
  return (
    <MeetingContext.Provider
      value={{
        meetingData,
        setMeetingData,
        showMeet,
        setShowMeet,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  return useContext(MeetingContext);
};
