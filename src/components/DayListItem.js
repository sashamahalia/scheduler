import React from "react";

import 'components/DayListItem.scss';
import classnames from 'classnames';

export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 1) {
      return `${props.spots} spot remaining`
    }

    if (props.spots === 0) {
      return 'no spots remaining'
    }

    return `${props.spots} spots remaining`

  }

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
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h2 className="text--light">{formatSpots()}</h2>
    </li>
  );
}