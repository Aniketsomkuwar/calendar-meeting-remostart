import { useState } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

//importing from store
import { useMeetingContext } from "../../store/MeetingContext";

//small calendar on the left part component
export default function CalendarSmall({ today, handleCustomDate }) {
  const { setSearchQuery, setInputValue } = useMeetingContext();

  const [selectedDate, setSelectedDate] = useState(new Date());

  //for reseting the calendar to default values
  function handleResetCalendar() {
    setSelectedDate(today);
    handleCustomDate(today);
    setSearchQuery("");
    setInputValue("");
  }

  return (
    <div className="w-fit left-0 right-0 mx-auto pt-12 px-10">
      {/* using the StaticDatePicker from mui library */}
      <StaticDatePicker
        defaultValue={dayjs(today)}
        value={dayjs(selectedDate)}
        onChange={(newValue) => handleCustomDate(newValue.$d)}
        onMonthChange={(newValue) => handleCustomDate(newValue.$d)}
        sx={{
          color: "#fff",
          backgroundColor: "#272829",
          ".MuiPickersToolbar-root": {
            color: "#fff",
          },
          ".MuiPickersCalendarHeader-root": {
            color: "#fff",
          },
          ".MuiPickersCalendarHeader-labelContainer": {
            color: "#1976d2",
            fontSize: "1.1rem",
          },
          ".MuiPickersCalendarHeader-switchViewIcon": {
            color: "#fff",
          },
          ".MuiPickersDay-root": {
            color: "#fff",
          },
          ".MuiDayCalendar-weekDayLabel": {
            color: "gray",
          },
          ".MuiPickersYear-root": {
            color: "#fff",
          },
          ".MuiPickersDay-today": {
            borderWidth: 1,
            borderColor: "#fff",
            border: "1px solid",
          },
        }}
      />

      {/* reset button */}
      <button
        className="text-[#66b2b2] px-5 py-2 font-customFont font-semibold relative left-56 bottom-10 hover:bg-[#2c3e50]"
        onClick={handleResetCalendar}
      >
        Reset
      </button>
    </div>
  );
}
