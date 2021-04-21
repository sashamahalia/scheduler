import React from "react";

import './InterviewerListItem.scss'
import classnames from 'classnames'

export default function InterviewerListItem(props) {


  const interviewerClass = classnames('interviewers__item', {
    'interviewers__item--selected': props.selected
  })
  console.log(props.name)
  return ( 
    <li
      onClick={props.setInterviewer}
      className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )

}