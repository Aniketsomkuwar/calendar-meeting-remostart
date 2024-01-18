import dayjs from "dayjs";
import CalendarSmall from "./CalendarSmall";
import Events from "./Events";

export default function SideBar({ handleCustomDate }) {
  const today = new Date();
  const todayDate = dayjs(today).format("DD/MM/YYYY");
  const tomorrowDate = dayjs(today).add(1, "day").format("DD/MM/YYYY");

  return (
    <>
      <aside className="w-fit px-10 h-screen bg-[#272829]">
        <CalendarSmall today={today} handleCustomDate={handleCustomDate} />

        <Events date={todayDate} day={"TODAY"}>
          <div className="text-white flex items-center gap-2 font-light">
            <span className="text-xs">🟢</span>
            <span className="text-sm">Final project meeting</span>
          </div>
          <div className="text-white flex items-center gap-2 font-light">
            <span className="text-xs">🟢</span>
            <span className="text-sm">Lunch interview</span>
          </div>
        </Events>

        <Events date={tomorrowDate} day={"TOMORROW"}>
          <div className="text-white flex items-center gap-2 font-light">
            <span className="text-xs">🟢</span>
            <span className="text-sm">Meeting with client</span>
          </div>
          <div className="text-white flex items-center gap-2 font-light">
            <span className="text-xs">🟢</span>
            <span className="text-sm">On-call interview</span>
          </div>
        </Events>
      </aside>
    </>
  );
}
