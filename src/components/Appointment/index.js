import React from 'react';
import useVisualMode from '../../hooks/useVisualMode';

import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const EDIT = 'EDIT';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';


  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //upon save, passes interview object to bookInterview function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(res => transition(SHOW))
    .catch(err => console.log('error status:', err.response.status))
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then((res) => transition(EMPTY))
  }

  function confirm() {
    transition(CONFIRM);
  }

  return (
    <article className='appointment'>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving appointment"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?"  onCancel={() => back()} onConfirm={cancel} />}
      {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        id={props.id}
      />
      )}
      {mode === CREATE && (
        <Form 
          onChange={console.log('onchange')} 
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()} 
        />
      )}
      {mode === EDIT && (
        <Form 
          onChange={console.log('onchange')} 
          name={props.name}
          value={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()} 
        />
      )}
    </article>
  )
}