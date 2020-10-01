import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import slugify from "slugify";

const GET_FILM = gql`
  query getFilm {
    allFilms {
      edges {
        node {
          id
          title
          releaseDate
          director
          producers
          starshipConnection {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`;

const INITIAL_STATE = {
  title: "",
  releaseDate: "",
  director: "",
  producers: "",
};

const Movie = () => {
  let { slug } = useParams();
  const [movie, setMovie] = useState(INITIAL_STATE);

  useEffect(() => {
    setMovie(INITIAL_STATE);
  }, [slug]);

  const { loading, error, data } = useQuery(GET_FILM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let appearance = data.allFilms.edges.map((edge) => {
    const {
      title,
      releaseDate,
      director,
      producers,
      starshipConnection,
    } = edge.node;

    const exist = starshipConnection.edges.filter(
      (x) => slugify(x.node.name.toLowerCase()) === slug.toLowerCase()
    );
    return (
      <>
        {exist.length > 0 ? (
          <button
            className={title === movie.title ? "active" : ""}
            key={title}
            onClick={() =>
              setMovie({
                title: title,
                releaseDate: releaseDate,
                director: director,
                producers: producers,
              })
            }
          >
            <span role="img" aria-label="emoji">
              🎥
            </span>{" "}
            {title}
          </button>
        ) : null}
      </>
    );
  });

  return (
    <section>
      {appearance}
      {movie.releaseDate ? (
        <p>
          <strong>Release date:</strong> {movie.releaseDate}
        </p>
      ) : null}
      {movie.director ? (
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
      ) : null}
      {movie.producers ? (
        <p>
          <strong>Producers:</strong> {movie.producers.join(", ")}
        </p>
      ) : null}
    </section>
  );
};

export default Movie;
