import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const dogRandomUrl = "https://dog.ceo/api/breeds/image/random";
const dogBreedUrl = "https://dog.ceo/api/breed//images/random";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [tempTerm, setTempTerm] = useState("");

  const getResults = async (breed) => {
    setIsLoading(true);

    let dogList = [];

    if (!breed || breed.length === 0) {
      for (let index = 0; index < 10; index++) {
        const response = await fetch(dogRandomUrl).then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        });
        dogList.push(response.message);
      }
    } else {
      const parts = dogBreedUrl.split("breed/");
      const completeUrl = parts[0] + "breed/" + breed.toLowerCase() + parts[1];
      for (let index = 0; dogList.length < 10; index++) {
        const response = await fetch(completeUrl).then((response) => {
          return response.json();
        });
        if (!dogList.includes(response.message)) {
          dogList.push(response.message);
        }
        if (index === 20) {
          break;
        }
      }
    }

    setResults(dogList);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
        setTempTerm,
        tempTerm,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
