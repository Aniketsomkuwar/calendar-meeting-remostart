import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function CalendarSmall({ today }) {
  return (
    <div className="w-fit left-0 right-0 mx-auto pt-12">
      <StaticDatePicker
        defaultValue={dayjs(today)}
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
            fontSize: "1.3rem",
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
    </div>
  );
}
