import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import MeetingDetailsPage from "./Screens/DetailScreen/MeetingDetailsPage";
function App() {
  const tempData = {
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
    decisions: ["Make an audio recording of each meeting"],
    actionItems: [
      { task: "Write a Medium article to introduce us", done: false },
    ],
    outcomes: ["Ideas for sending a Tweet after each meeting"],
  };

  return (
    <>
      {/* <HomeScreen /> */}
      <MeetingDetailsPage />
    </>
  );
}

export default App;
