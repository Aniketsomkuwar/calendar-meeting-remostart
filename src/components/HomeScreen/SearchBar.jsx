import { useEffect, useState } from "react";

//icons import
import { BiSolidCategory, BiUser, BiUserCheck, BiChat } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { PiTextAUnderlineBold } from "react-icons/pi";
import IconButton from "./IconButton";

//importing from store
import { useMeetingContext } from "../../store/MeetingContext";

//search bar component
export default function SearchBar({ newEvents }) {
  const { setSearchQuery, inputValue, setInputValue } = useMeetingContext();

  const [dropVisible, setDropVisible] = useState(false);
  const [iconTrayVisible, setIconTrayVisible] = useState(false);
  const [dropType, setDropType] = useState("agenda");
  const [filteredEvents, setFilteredEvents] = useState(newEvents);
  const [isInputFocus, setIsInputFocus] = useState(false);

  //for clicking on the search bar
  function handleInputFocus() {
    setIconTrayVisible(false);
    setDropVisible(true);
    setIsInputFocus(true);
  }

  //for clearing the input field
  function handleCrossIcon() {
    setDropVisible(false);
    setIsInputFocus(false);
    setInputValue("");
  }

  //runs when the value is selected from the search suggestion
  function handleInputChange(data) {
    setInputValue(data);
  }

  //for handling the icon tray
  function handleIconTrayVisible() {
    setIconTrayVisible((visible) => !visible);
    setInputValue("");
  }

  //for handling the items clicked in the suggestion list
  function handleListClick(item) {
    setInputValue(dropType === "agenda" ? item.agenda : item.title);
    setSearchQuery(item.id);
  }

  //for removing the suggestions box when a item is clicked
  useEffect(
    function () {
      if (inputValue) {
        setDropVisible(false);
      }
    },
    [inputValue]
  );

  useEffect(() => {
    // Filter events based on input value and drop type
    const filtered = newEvents.filter((item) => {
      const searchString = inputValue.toLowerCase();
      let fieldToSearch = "";
      switch (dropType) {
        case "agenda":
          fieldToSearch = item.agenda.toLowerCase();
          break;
        case "minutesBy":
          fieldToSearch = item.title.toLowerCase();
          break;
        case "presentPeople":
          fieldToSearch = item.present.toLowerCase();
          break;
        case "discussionPoints":
          fieldToSearch = item.keyDiscussionPoints.toLowerCase();
          break;
      }
      return fieldToSearch.includes(searchString);
    });

    setFilteredEvents(filtered);
  }, [newEvents, inputValue, dropType]);

  return (
    <>
      <div className="flex items-center mt-5 justify-between">
        {isInputFocus ? (
          <button
            className="font-customFont font-medium bg-[#2c3e50] text-xl py-2 px-3 rounded-full text-[white] ml-4 border-2 border-white border-solid"
            onClick={handleCrossIcon}
          >
            <RxCross2 />
          </button>
        ) : (
          <button
            className="font-customFont font-medium bg-[#2c3e50] text-xl py-2 px-3 rounded-full text-[white] ml-4 border-2 border-white border-solid"
            onClick={handleIconTrayVisible}
          >
            <BiSolidCategory />
          </button>
        )}

        {/* Icon Tray */}

        {iconTrayVisible && (
          <div className="absolute top-[4.5rem] bg-[#2c3e50] ml-4 py-1 rounded-3xl border-2 border-white border-solid z-10">
            <IconButton onButtonClick={() => setDropType("agenda")}>
              <PiTextAUnderlineBold size={18} />
            </IconButton>

            <IconButton onButtonClick={() => setDropType("minutesBy")}>
              <BiUser size={18} />
            </IconButton>

            <IconButton onButtonClick={() => setDropType("presentPeople")}>
              <BiUserCheck size={18} />
            </IconButton>
            <IconButton onButtonClick={() => setDropType("discussionPoints")}>
              <BiChat size={18} />
            </IconButton>
          </div>
        )}

        {/* search input bar */}
        <input
          placeholder={`Search by ${dropType}`}
          className="w-3/4 mr-5 px-3 h-10 rounded-md  placeholder:font-normal placeholder:text-sm placeholder:font-customFont placeholder:text-gray-700 outline-none font-customFont font-medium border-none text-sm"
          onFocus={handleInputFocus}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      {/* suggestions box for search bar */}
      {dropVisible && (
        <div className="bg-white absolute top-16 w-[18.7rem] left-20 rounded-md z-10 pb-1">
          <ul className="max-h-48 overflow-auto whitespace-normal break-words text-left">
            {filteredEvents.map((item, i) => (
              <li
                className="font-customFont p-3 border-b-2 border-gray-200 border-solid hover:bg-gray-200 cursor-pointer text-sm font-medium rounded-t-md"
                key={i}
                onClick={() => handleListClick(item)}
              >
                <span className="text-xs mr-2">🟢</span>
                {dropType === "agenda"
                  ? item.agenda
                  : dropType === "minutesBy"
                  ? item.title
                  : dropType === "presentPeople"
                  ? item.present
                  : dropType === "discussionPoints"
                  ? item.keyDiscussionPoints
                  : item.agenda}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
