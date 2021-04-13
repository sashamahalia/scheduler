import React from "react";

import 'components/DayListItem.scss';
import classnames from 'classnames';

export default function DayListItem(props) {

  const dayClass = classnames(
    {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
    'day-list__item': true
  })

  return (
    <li 
      onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h2 className="text--light">{props.spots} spots remaining</h2>
    </li>
  );
}