import { createContext, useContext, useState } from "react";

// Create a context
const MeetingContext = createContext();

// Create a context provider
export const MeetingProvider = ({ children }) => {
  const [meetingData, setMeetingData] = useState([]);
  const [showMeet, setShowMeet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  return (
    <MeetingContext.Provider
      value={{
        meetingData,
        setMeetingData,
        showMeet,
        setShowMeet,
        searchQuery,
        setSearchQuery,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

// Custom hook to use the meeting context
export const useMeetingContext = () => {
  return useContext(MeetingContext);
};
