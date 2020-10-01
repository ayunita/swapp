import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import slugify from "slugify";
import usePrevious from "../utils/usePrevious";

const GET_PILOTS = gql`
  query getStarships {
    allStarships {
      edges {
        node {
          id
          name
          pilotConnection {
            edges {
              node {
                id
                name
                birthYear
                eyeColor
                gender
                hairColor
                height
                mass
                skinColor
              }
            }
          }
        }
      }
    }
  }
`;

const INITIAL_STATE = {
  name: "",
  birthYear: "",
  eyeColor: "",
  gender: "",
  hairColor: "",
  height: "",
  mass: "",
  skinColor: "",
};

const Pilot = () => {
  let { slug } = useParams();
  const [pilot, setPilot] = useState(INITIAL_STATE);

  const prevSlug = usePrevious(slug);

  useEffect(() => {
    if (prevSlug != slug) {
      setPilot(INITIAL_STATE);
    }
  }, [slug]);

  const { loading, error, data } = useQuery(GET_PILOTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let pilots = data.allStarships.edges.map((edge, index) => (
    <div key={index}>
      {edge.node.pilotConnection.edges.map((child_edge) => {
        if (slugify(edge.node.name.toLowerCase()) === slug.toLowerCase()) {
          const {
            name,
            birthYear,
            eyeColor,
            gender,
            hairColor,
            height,
            mass,
            skinColor,
          } = child_edge.node;
          return (
            <button
              key={name}
              className={name === pilot.name ? "active" : ""}
              onClick={() =>
                setPilot({
                  name: name,
                  birthYear: birthYear,
                  eyeColor: eyeColor,
                  gender: gender,
                  hairColor: hairColor,
                  height: height,
                  mass: mass,
                  skinColor: skinColor,
                })
              }
            >
              👨‍🚀 {name}
            </button>
          );
        }
      })}
    </div>
  ));

  return (
    <section>
      {pilots}
      {pilot.birthYear ? <p><strong>Birth year:</strong> {pilot.birthYear}</p> : null}
      {pilot.eyeColor ? <p><strong>Eye color:</strong> {pilot.eyeColor}</p> : null}
      {pilot.gender ? <p><strong>Gender:</strong> {pilot.gender}</p> : null}
      {pilot.hairColor ? <p><strong>Hair color:</strong> {pilot.hairColor}</p> : null}
      {pilot.height ? <p><strong>Height:</strong> {pilot.height}</p> : null}
      {pilot.mass ? <p><strong>Mass:</strong> {pilot.mass}</p> : null}
      {pilot.skinColor ? <p><strong>Skin color:</strong> {pilot.skinColor}</p> : null}
    </section>
  );
};

export default Pilot;
