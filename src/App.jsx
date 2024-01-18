import FetchData from "./FetchData";
import BigCalendar from "./components/BigCalendar";
import MeetingDetailsPage from "./components/MeetingDetailsPage";

function App() {

  const tempData = {
    date: '2023-09-07',
    attendees: ['Ubio', 'Okan', 'Tommy', 'Chris', 'Vani', 'Rafael', 'Eszter'],
    apologies: ['Jan'],
    agendaItems: ['Documenting meetings for transparency', 'How to present ourselves to the community'],
    keyDiscussionPoints: ['What is enough documentation?', 'Can we use AI tooling for documentation?', 'Balancing privacy with transparency'],
    decisions: ['Make an audio recording of each meeting'],
    actionItems: [
      { task: 'Write a Medium article to introduce us', done: false }
    ],
    outcomes: ['Ideas for sending a Tweet after each meeting']
  }

  return (
    <>
      {/* <FetchData /> */}
      {/* <div className="w-9/12 ml-auto p-4">
        <BigCalendar/>
      </div> */}

      <MeetingDetailsPage meetingData={ tempData } />
    </>
  );
}

export default App;
