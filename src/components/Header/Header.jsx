import React, { useState } from "react";
import AddModel from "../AddModel/AddModel";
import { FiPlus } from "react-icons/fi";
import { searchTheNote } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  function modelOpenAndClose() {
    setOpen(!isOpen);
  }

  function handleSearch(e) {
    // console.log("Search value....", e.target.value);
    dispatch(searchTheNote(e.target.value));
  }

  return (
    <div className="px-3 py-4 boxshadow">
      <div className="flex justify-center items-center mb-4 sm:mb-0">
        <span className="text-xl sm:text-2xl font-bold tracking-wide">
          My Note
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div
          className="cursor-pointer rounded-border"
          onClick={modelOpenAndClose}
        >
          <span className="font-semibold">Add note</span>
        </div>

        <div className="relative w-full sm:w-auto mt-3 lg:mt-0">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none"
          />
          <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 18l6-6m0 0l-6-6m6 6H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && <AddModel modelOpenAndClose={modelOpenAndClose} />}
    </div>
  );
};

export default Header;
