import { useState } from "react";

//importing from homescreen components
import CalendarLarge from "../components/HomeScreen/CalendarLarge";
import SideBar from "../components/HomeScreen/SideBar";

//homeScreen page component -> parent component
export default function HomeScreen({ newEvents }) {
  const [customDate, setCustomDate] = useState(new Date());

  //this function is sent to sidebar to get a date and then the date is sent to the right part for navigating the the right container with the help of left calendar
  function handleCustomDate(date) {
    setCustomDate(date);
  }

  return (
    <>
      <div className="flex">
        <SideBar handleCustomDate={handleCustomDate} newEvents={newEvents} />
        <CalendarLarge customDate={customDate} newEvents={newEvents} />
      </div>
    </>
  );
}
