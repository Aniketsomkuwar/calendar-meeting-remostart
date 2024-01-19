import AttendeeCard from "./Components/Cards/AttendeeCard";
import ActionItemCard from "./Components/Cards/ActionItemCard";

const meetingData = {
  date: "2023-09-07",
  attendees: ["Ubio", "Okan", "Tommy", "Chris", "Vani", "Rafael", "Eszter"],
  apologies: ["Jan"],
  agendaItems: [
    "Documenting meetings for transparency",
    "How to present ourselves to the community",
  ],
  keyDiscussionPoints: [
    "What is enough documentation?",
    "Can we use AI tooling for documentation?",
    "Balancing privacy with transparency",
  ],
  decisions: [
    "We'll make an audio recording of each meeting - not to share, but for avoidance of doubt",
  ],
  actionItems: [
    { task: "Okan to write a Medium article to introduce us", done: false },
    { task: "check design", done: true },
  ],
  outcomes: [" Sending a Tweet after each meeting?"],
};

const MeetingDetailsPage = ({ eventDetail }) => {
  console.log(eventDetail);

  return (
    <div className="flex h-screen font-customFont">
      {/* Left Panel (20% width) */}
      <div className="w-1/5 bg-[#272829] text-white pt-8 overflow-hidden">
        <div>
          <h3 className="text-lg font-semibold mb-2 w-fit ml-10">Attendees</h3>
          <div className="space-y-2 w-4/5 ml-10">
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
            Meeting - {`${meetingData.date}`}
          </h2>
        </div>
        <div className="p-10 shadow-lg container mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Apologies</h3>
            <ul className="list-disc list-inside">
              {meetingData.apologies.map((apology, index) => (
                <li key={index} className="mb-1">
                  {apology}
                </li>
              ))}
            </ul>
          </div>

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
      </div>

      {/* right panel  */}
      <div className="w-1/5 bg-gray-200 p-4 overflow-hidden">
        <h3 className="text-2xl font-bold mb-4">Action Items</h3>
        <div className="space-y-2">
          {meetingData.actionItems.map((actionItem, index) => (
            <ActionItemCard key={index} actionItem={actionItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
