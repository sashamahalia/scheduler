import React from 'react';
import { render } from '@testing-library/react';

import Appointment from 'components/Appointment';

const interview = {
  student: 'Sasha',
  interviewer: {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
}

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment interview={interview}/>)
  });
});
