//reusable component for today and tomorrow events
export default function Events({ children, date, day }) {
  const textColor = day === "TODAY" ? "text-[#c30101]" : "text-white";

  return (
    <div className="ml-5 mt-5 px-10 font-customFont">
      <div className="flex gap-3 items-center">
        <p className={`text-lg font-medium ${textColor}`}>{day}</p>
        <p className="text-lg text-white">{date}</p>
      </div>

      <div className="mt-3 ml-2">{children}</div>
    </div>
  );
}
