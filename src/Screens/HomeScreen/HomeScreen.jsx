import { useState } from "react";
import CalendarLarge from "./Components/CalendarLarge";
import SideBar from "./Components/SideBar";

export default function HomeScreen() {
  const [customDate, setCustomDate] = useState(new Date());

  function handleCustomDate(date) {
    setCustomDate(date);
  }

  return (
    <>
      <div className="flex">
        <SideBar handleCustomDate={handleCustomDate} />
        <CalendarLarge customDate={customDate} />
      </div>
    </>
  );
}
