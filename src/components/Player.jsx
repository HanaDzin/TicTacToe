import React, { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  //show the player name or an input if we want to edit it
  let playerName = <span className="player-name">{name}</span>;
  if (isEditing)
    playerName = (
      <input type="text" value={name} required onChange={handleChange} />
    );

  function handleEditClick() {
    //to make sure you are working with the latest state value, pass a function to the state updating function
    setIsEditing((editing) => !editing);
    //instead of: setIsEditing(!isEditing)
    if (isEditing) {
      onChangeName(symbol, name);
    }
  }

  //handles logic when onChange event happens on input field - every time user enters a char
  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
