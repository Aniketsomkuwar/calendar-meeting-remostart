import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

export default function CalendarSmall({ today, handleCustomDate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleResetCalendar() {
    setSelectedDate(today);
    handleCustomDate(today);
  }

  return (
    <div className="w-fit left-0 right-0 mx-auto pt-12 px-10">
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
      <button
        className="text-[#66b2b2] px-5 py-2 font-customFont font-semibold relative left-56 bottom-10 hover:bg-[#2c3e50]"
        onClick={handleResetCalendar}
      >
        Reset
      </button>
    </div>
  );
}
