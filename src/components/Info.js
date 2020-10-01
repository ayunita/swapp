import React from "react";
import Movie from "./Movie";
import Pilot from "./Pilot";

const Info = ({ ss }) => {

  return (
    <div>
      <h1>{ss}</h1>
      <h3>Movie appearance</h3>
      <Movie />
      <h3>Pilots</h3>
      <Pilot />
    </div>
  );
};

export default Info;
