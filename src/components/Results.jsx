import React, { useEffect } from "react";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();

  useEffect(() => {
    if (searchTerm) {
      getResults(searchTerm);
    }
  }, [searchTerm]);

  if (isLoading) return <Loading />;

  return (
    <div className=" flex flex-wrap justify-center items-center bg-gray-100 dark:bg-gray-900 h-fit pb-16">
      {results ? (
        results.map((item) => (
          <div className="p-2 ">
            <img
              className="bg-cover h-40 rounded-sm"
              src={item}
              alt={item.split("/")[4]}
              loading="auto"
            />
            {!searchTerm ? (
              <p className="uppercase">{item.split("/")[4]}</p>
            ) : (
              ""
            )}
          </div>
        ))
      ) : (
        <div>Invalid dog breed!!</div>
      )}
    </div>
  );
};
