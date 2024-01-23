import { useState } from "react";
import AttendeeCard from "./Components/Cards/AttendeeCard";
import ActionItemCard from "./Components/Cards/ActionItemCard";
import { useMeetingContext } from "../../store/MeetingContext";

const MeetingDetailsPage = ({ meetingData }) => {
  const { setShowMeet } = useMeetingContext();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleGoBack = () => {
    setShowMeet(null);
  };

  const filterActionItems = () => {
    if (selectedCategory === "all") {
      return meetingData.actionItems;
    } else {
      return meetingData.actionItems.filter(
        (item) => item.status === selectedCategory
      );
    }
  };

  return (
    <div className="flex h-screen font-customFont">
      {/* Left Panel (20% width) */}
      <div className="w-1/5 bg-[#272829] text-white p-4 overflow-hidden ">
        <div className="my-6">
          <button
            onClick={handleGoBack}
            className="text-[#272829] py-2 px-4 rounded-full hover:text-gray-300 focus:outline-none bg-white "
          >
            &#8592; Go Back
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Attendees</h3>
          <div className="space-y-2">
            {meetingData.attendees.map((attendee, index) => (
              <AttendeeCard key={index} attendee={attendee} />
            ))}
          </div>
        </div>
      </div>

      {/* middle Panel  */}
      <div className="w-3/5 bg-white p-4 overflow-y-auto flex flex-col justify-items-center">
        <div className="bg-[#272829] text-white py-5 text-center">
          <h2 className="text-4xl font-extrabold">
            {meetingData.name} by {meetingData.documenter} - {meetingData.date}
          </h2>
        </div>
        <div className="p-10 shadow-lg container mx-auto">
          {/* <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Apologies</h3>
            <ul className="list-disc list-inside">
              {meetingData.apologies.map((apology, index) => (
                <li key={index} className="mb-1">
                  {apology}
                </li>
              ))}
            </ul>
          </div> */}

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Agenda Items</h3>
            <ul className="list-disc list-inside">
              {meetingData.agendaItems.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Key Discussion Points
            </h3>
            <ul className="list-disc list-inside">
              {meetingData.keyDiscussionPoints.map((point, index) => (
                <li key={index} className="mb-1">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Decisions</h3>
            <ul className="list-disc list-inside">
              {meetingData.decisions.map((decision, index) => (
                <li key={index} className="mb-1">
                  {decision}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {meetingData.outcomes && (
          <div className="p-10 shadow-lg rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Outcomes</h3>
              <ul className="list-disc list-inside">
                {meetingData.outcomes.map((outcome, index) => (
                  <li key={index} className="mb-1">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* right panel  */}
      <div className="w-1/5 bg-gray-200 p-4 overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Action Items</h3>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`text-sm px-2 py-1  focus:outline-none ${
              selectedCategory === "all"
                ? "bg-[#272829] text-gray-300"
                : "text-[#272829]"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory("todo")}
            className={`text-sm px-2 py-1 focus:outline-none ${
              selectedCategory === "todo"
                ? "bg-[#272829] text-gray-300"
                : "text-[#272829]"
            }`}
          >
            To Do
          </button>
          <button
            onClick={() => setSelectedCategory("in progress")}
            className={`text-sm px-2 py-1  focus:outline-none ${
              selectedCategory === "in progress"
                ? "bg-[#272829] text-gray-300"
                : "text-[#272829]"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setSelectedCategory("done")}
            className={`text-sm px-2 py-1 focus:outline-none ${
              selectedCategory === "done"
                ? "bg-[#272829] text-gray-300"
                : "text-[#272829]"
            }`}
          >
            Done
          </button>
        </div>
        <div className="space-y-2">
          {filterActionItems().map((actionItem, index) => (
            <ActionItemCard key={index} actionItem={actionItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
