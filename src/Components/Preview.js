import React from "react";
import { useLocation } from "react-router-dom";

const Preview = () => {
  let location = useLocation();

  return (
    <>
      <h1>{location.state.option.toUpperCase()}</h1>
      <div>
        <h1>{location.state.lableName}</h1>
        <img src={`${global.url}${location.state.ImageUrl}`} />
      </div>
    </>
  );
};

export default Preview;
