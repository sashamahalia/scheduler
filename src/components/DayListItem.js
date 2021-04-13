import React from "react";

export default function DayListItem(props) {

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h2 className="text--light">{props.spots} spots remaining</h2>
    </li>
  );
}