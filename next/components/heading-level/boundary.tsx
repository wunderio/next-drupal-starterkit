import React from "react";
import PropTypes from "prop-types";

import { LevelContext } from "./context";

const Boundary = ({ children, levelOverride }) => (
  <LevelContext.Consumer>
    {(level) => (
      <LevelContext.Provider
        value={levelOverride ? parseInt(levelOverride, 10) : level + 1}
      >
        {children}
      </LevelContext.Provider>
    )}
  </LevelContext.Consumer>
);

Boundary.displayName = "Heading.Boundary";

Boundary.propTypes = {
  levelOverride: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.any,
};

export default Boundary;
