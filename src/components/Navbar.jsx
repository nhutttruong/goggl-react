import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useResultContext } from "../contexts/ResultContextProvider";
import { Search } from "./Search";
import Select from "react-select";

export const Navbar = ({ darkTheme, setDarkTheme }) => {
  const { setSearchTerm, setTempTerm, tempTerm, getResults } =
    useResultContext();

  function handleKeyPress(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
      let buttonElement = document.querySelector("button");
      buttonElement.click();
    }
  }

  return (
    <div
      className=" p-5 pb-0 flex flex-wrap justify-center box-border 
      items-center border-b border-b-gray-200 dark:border-b-gray-700 "
    >
      <div className="flex justify-between items-center space-x-5 w-screen">
        <div className=" flex flex-row justify-between w-4/6 ">
          <Link
            to="/"
            className="text-2xl basis-1/4 max-w-[120px] truncate bg-blue-500 font-bold text-white px-2 rounded dark:bg-gray-100 dark:text-gray-900 mr-2 mb-2"
          >
            <p className=" sm:inline-block">Goggl</p>
            <p className="hidden sm:inline-block">🔎</p>
          </Link>

          <div className="flex basis-9/12">
            <div className="basis-3/6">
              <div className="pb-2 ">
                <input
                  type="text"
                  className="truncate rounded-full px-3 py-2 w-10/12 mr-1 border-1 shadow-lg dark:text-gray-900"
                  placeholder="Type in a dog breed"
                  onChange={(e) => {
                    setTempTerm(e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyPress(e)}
                ></input>
                <button
                  className="text-sm md:text-lg hidden md:inline-block"
                  onClick={() => {
                    //set the value of the select componenent to the default
                    let selectElement = document.querySelector("select");
                    selectElement.value = "";

                    if (tempTerm) {
                      setSearchTerm(tempTerm);
                    } else {
                      setSearchTerm("");
                      getResults("");
                    }
                  }}
                >
                  🔍
                </button>
              </div>
            </div>
            <div className="basis-2/6">
              <select
                className="mt-2 rounded-md  dark:text-gray-900 shadow-md"
                onChange={(e) => {
                  if (e.target.value) {
                    let inputElement = document.querySelector("input");
                    inputElement.value = "";
                    setSearchTerm(e.target.value);
                  }
                }}
                defaultValue=""
              >
                <option value="" className="font-bold">
                  Select a breed
                </option>
                <option value="shiba">Shiba</option>
                <option value="stbernard">St. Bernard</option>
                <option value="pitbull">Pitbull</option>
                <option value="beagle">Beagle</option>
                <option value="chihuahua">Chihuahua</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative ">
          <button
            type="button"
            onClick={() => setDarkTheme(!darkTheme)}
            className="absolute bottom-1 right-1 dark:bg-gray-50 bg-gray-500 border rounded-full px-1.5 py-1 hover:shadow-lg"
          >
            {darkTheme ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};
