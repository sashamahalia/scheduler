import React from "react";
import useVisualMode from "../../hooks/useVisualMode";

import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //upon save, passes interview object to bookInterview function, which makes a put request to axios
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    if (!interviewer) {
      return;
    }

    transition(SAVING, true);

    props
      .bookInterview(props.id, interview)
      .then((res) => transition(SHOW))
      .catch((err) => transition(ERROR_SAVE, true));
  }

  //upon destroy, transitions to Deleting mode, runs cancels interview function, and returns mode based on axios delete request
  function destory(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then((res) => transition(EMPTY))
      .catch((err) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === ERROR_DELETE && (
        <Error onClose={() => back()} message="Could not cancel appointment." />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={() => back()} message="Could not save appointment." />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={destory}
        />
      )}
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
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.name}
          value={props.interview && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
    </article>
  );
}
