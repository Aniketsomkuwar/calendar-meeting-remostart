import React from "react";
import AttendeeCard from "./utils/AttendeeCard";

const MeetingDetailsPage = ({ meetingData }) => {
  return (
    <div className="flex h-screen">
      {/* Left Panel (20% width) */}
      <div className="w-1/5 bg-gray-800 text-white p-4 overflow-hidden">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{`${meetingData.date}`}</h2>
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

      {/* Right Panel (80% width, scrollable) */}
      <div className="w-4/5 bg-white p-4 overflow-y-auto">
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
          <h3 className="text-xl font-semibold mb-2">Key Discussion Points</h3>
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

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Action Items</h3>
          <ul className="list-disc list-inside">
            {meetingData.actionItems.map((actionItem, index) => (
              <li key={index} className="mb-1">
                {actionItem.done ? (
                  <span className="text-green-500">
                    &#10003; {actionItem.task}
                  </span>
                ) : (
                  <span className="text-red-500">
                    &#10007; {actionItem.task}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

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
  );
};

export default MeetingDetailsPage;
