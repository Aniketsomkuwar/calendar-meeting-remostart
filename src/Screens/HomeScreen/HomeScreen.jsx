import { useState } from "react";
import CalendarLarge from "./Components/CalendarLarge";
import SideBar from "./Components/SideBar";

export default function HomeScreen({ newEvents }) {
  const [customDate, setCustomDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  function handleCustomDate(date) {
    setCustomDate(date);
  }

  return (
    <>
      <div className="flex">
        <SideBar
          handleCustomDate={handleCustomDate}
          newEvents={newEvents}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <CalendarLarge
          customDate={customDate}
          newEvents={newEvents}
          searchQuery={searchQuery}
        />
      </div>
    </>
  );
}
