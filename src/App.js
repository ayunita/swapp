import React, { useState } from "react";
import "./App.css";
import Info from "./components/Info";
import { useQuery, gql } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import slugify from "slugify";

const GET_STARSHIPS = gql`
  query getStarships {
    allStarships {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const App = () => {
  const [spaceship, setSpaceship] = useState("");

  const { loading, error, data } = useQuery(GET_STARSHIPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let starships = data.allStarships.edges.map((edge) => {
    const { id, name } = edge.node;
    const slug = slugify(name);
    return (
      <NavLink
        key={id}
        to={`/ship/${slug}`}
        className="nav-link"
        activeClassName="active"
        onClick={() => setSpaceship(name)}
      >
        {name}
      </NavLink>
    );
  });
  return (
    <Router>
      <div className="page-container">
        <div className="page-nav">
          <div className="nav-title">
            <span style={{ color: "#13ca91" }}>SW</span>
            <span style={{ color: "#ba1e68" }}>app</span>
            <div style={{ fontSize: ".5rem", color: "#13ca91" }}>
              <p>May the Force be with you</p>
              <p>Built with <span style={{ color: "red" }}>&#10084;</span> in
              Canada | Visit me{" "}
              <a
                href="https://ayunita.xyz"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              </p>
            </div>
          </div>
          <nav>{starships}</nav>
        </div>
        <div className="page-content">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <div>
                  <h1>Welcome!</h1>
                  <h2>
                    Use the left navigation bar to browse Star Wars Spaceships
                  </h2>
                </div>
              )}
            />
            <Route path="/ship/:slug" exact children={<Info ss={spaceship}/>} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
