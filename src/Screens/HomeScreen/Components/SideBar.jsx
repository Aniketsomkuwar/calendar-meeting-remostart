import dayjs from "dayjs";
import CalendarSmall from "./CalendarSmall";
import Events from "./Events";
import SearchBar from "./SearchBar";

export default function SideBar({ handleCustomDate, newEvents }) {
  const today = new Date();
  const todayDate = dayjs(today).format("YYYY-MM-DD");
  const tomorrowDate = dayjs(today).add(1, "day").format("YYYY-MM-DD");

  return (
    <>
      <aside className="w-fit h-screen bg-[#272829]">
        <SearchBar newEvents={newEvents} />

        <CalendarSmall today={today} handleCustomDate={handleCustomDate} />

        <Events date={todayDate} day={"TODAY"}>
          {newEvents.map((meeting, i) =>
            meeting.start === todayDate ? (
              <div
                className="text-white flex items-center gap-2 font-light"
                key={i}
              >
                <span className="text-xs">🟢</span>
                <span className="text-sm">{meeting.title}</span>
              </div>
            ) : null
          )}
          {newEvents.every((meeting) => meeting.start !== todayDate) && (
            <div className="text-yellow-500">No Meetings</div>
          )}
        </Events>

        <Events date={tomorrowDate} day={"TOMORROW"}>
          {newEvents.map((meeting, i) =>
            meeting.start === tomorrowDate ? (
              <div
                className="text-white flex items-center gap-2 font-light"
                key={i}
              >
                <span className="text-xs">🟢</span>
                <span className="text-sm">{meeting.title}</span>
              </div>
            ) : null
          )}
          {newEvents.every((meeting) => meeting.start !== tomorrowDate) && (
            <div className="text-yellow-500">No Meetings</div>
          )}
        </Events>
      </aside>
    </>
  );
}
