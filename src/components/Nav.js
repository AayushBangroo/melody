import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ isLibraryActive, setIsLibraryActive }) => {
  const handleLibraryClick = () => {
    setIsLibraryActive(!isLibraryActive);
  };
  return (
    <nav className="navigation">
      <h2>Waves</h2>
      <button onClick={handleLibraryClick} className="navigation--button">
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
