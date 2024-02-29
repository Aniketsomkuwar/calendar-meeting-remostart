//importing from meeting details component
import AttendeeCard from "../components/MeetingDetailScreen/AttendeeCard";
import ActionItemCard from "../components/MeetingDetailScreen/ActionItemCard";
//importing from store
import { useMeetingContext } from "../store/MeetingContext";

//meetingDetails page component -> parent component
const MeetingDetailsPage = ({ meetingData }) => {
  const { setShowMeet } = useMeetingContext();

  //navigate back to main screen
  const handleGoBack = () => {
    setShowMeet(null);
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

        {meetingData?.present && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendees</h3>
            <div className="space-y-2">
              {meetingData.present.map((attendee, index) => (
                <AttendeeCard key={index} attendee={attendee} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* middle Panel  */}
      <div className="w-3/5 bg-white p-4 overflow-y-auto flex flex-col justify-items-center">
        <div className="bg-[#272829] text-white py-5 text-center">
          <h2 className="text-3xl font-extrabold">
            Meeting by {meetingData?.minutesBy} - {meetingData?.date}
          </h2>
        </div>
        <div className="p-10 shadow-lg container mx-auto">
          {meetingData?.agendaItems && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Agenda Items</h3>
              <ul className="list-disc list-inside">
                {meetingData.agendaItems.split(";").map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {meetingData?.keyDiscussionPoints && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Key Discussion Points
              </h3>
              <ul className="list-disc list-inside">
                {meetingData.keyDiscussionPoints
                  .split(";")
                  .map((point, index) => (
                    <li key={index} className="mb-1">
                      {point}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {meetingData?.decisions && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Decisions</h3>
              <ul className="list-disc list-inside">
                {meetingData.decisions.split(";").map((decision, index) => (
                  <li key={index} className="mb-1">
                    {decision}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {meetingData?.outcomes && (
          <div className="p-10 shadow-lg rounded-xl">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Outcomes</h3>
              <ul className="list-disc list-inside">
                {meetingData.outcomes.split(";").map((outcome, index) => (
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

        <div className="space-y-2">
          {/* {meetingData?.actionItems.map((actionItem, index) => ( */}
          <ActionItemCard actionItem={meetingData.actionItems} />
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsPage;
