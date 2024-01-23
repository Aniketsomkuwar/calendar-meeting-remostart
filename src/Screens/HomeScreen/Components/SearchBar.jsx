import { useEffect, useState } from "react";
import { BiSolidCategory, BiMessageSquareDetail, BiUser } from "react-icons/bi";
import { PiTextAUnderlineBold } from "react-icons/pi";
import IconButton from "./IconButton";
import { useMeetingContext } from "../../../store/MeetingContext";

export default function SearchBar({ newEvents }) {
  const { setSearchQuery } = useMeetingContext();

  const [dropVisible, setDropVisible] = useState(false);
  const [iconTrayVisible, setIconTrayVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [dropType, setDropType] = useState("title");

  function handleSearchDropVisible() {
    setIconTrayVisible(false);
    setTimeout(() => {
      setDropVisible((visible) => !visible);
    }, 100);
  }

  function handleInputChange(data) {
    setInputValue(data);
  }

  function handleIconTrayVisible() {
    setIconTrayVisible((visible) => !visible);
    setInputValue("");
  }

  const [filteredEvents, setFilteredEvents] = useState(newEvents);

  useEffect(() => {
    // Filter events based on input value and drop type
    const filtered = newEvents.filter((item) => {
      const searchString = inputValue.toLowerCase();
      const fieldToSearch =
        dropType === "title"
          ? item.title.toLowerCase()
          : dropType === "host"
          ? item.host.toLowerCase()
          : "";

      return fieldToSearch.includes(searchString);
    });

    setFilteredEvents(filtered);
  }, [newEvents, inputValue, dropType]);

  function handleListClick(item) {
    setInputValue(dropType === "title" ? item.title : item.host);
    setSearchQuery(item.id);
  }

  return (
    <>
      <div className="flex items-center mt-5 justify-between">
        <button
          className="font-customFont font-medium bg-[#2c3e50] text-xl py-2 px-3 rounded-full text-[white] ml-4 border-2 border-white border-solid"
          onClick={handleIconTrayVisible}
        >
          <BiSolidCategory />
        </button>

        {/* Icon Tray */}

        {iconTrayVisible && (
          <div className="absolute top-[4.5rem] bg-[#2c3e50] ml-4 py-1 rounded-3xl border-2 border-white border-solid z-10">
            <IconButton onButtonClick={() => setDropType("title")}>
              <PiTextAUnderlineBold size={18} />
            </IconButton>

            <IconButton onButtonClick={() => setDropType("host")}>
              <BiUser size={18} />
            </IconButton>

            <IconButton onButtonClick={() => setDropType("description")}>
              <BiMessageSquareDetail size={18} />
            </IconButton>
          </div>
        )}

        <input
          placeholder={`Search by ${dropType}`}
          className="w-3/4 mr-5 px-3 h-10 rounded-md  placeholder:font-normal placeholder:text-sm placeholder:font-customFont placeholder:text-gray-700 outline-none font-customFont font-medium border-none text-sm"
          onFocus={handleSearchDropVisible}
          onBlur={handleSearchDropVisible}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      {dropVisible && (
        <div className="bg-white absolute top-16 w-[18.7rem] left-20 rounded-md z-10 pb-1">
          <ul className="max-h-48 overflow-auto">
            {filteredEvents.map((item, i) => (
              <li
                className="font-customFont p-3 border-b-2 border-gray-200 border-solid hover:bg-gray-200 cursor-pointer text-sm font-medium rounded-t-md"
                key={i}
                onClick={() => handleListClick(item)}
              >
                <span className="text-xs mr-2">🟢</span>
                {dropType === "title" ? item.title : item.host}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}