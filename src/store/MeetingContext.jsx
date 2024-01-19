import React, { createContext, useContext, useState } from 'react';

// Create a context
const MeetingContext = createContext();

// Create a context provider
export const MeetingProvider = ({ children }) => {
  const [meetingData, setMeetingData] = useState([]);
  const [showMeet,setShowMeet] = useState(null)
  return (
    <MeetingContext.Provider value={{ meetingData, setMeetingData ,showMeet,setShowMeet}}>
      {children}
    </MeetingContext.Provider>
  );
};

// Custom hook to use the meeting context
export const useMeetingContext = () => {
  return useContext(MeetingContext);
};
