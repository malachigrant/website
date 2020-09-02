/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';

import Card from 'components/Card';
import Textbox from 'components/common/Textbox';

export const Todo = ({ value }) => {
  const { title, tasks } = value;

  const [newTask, setNewTask] = useState('');

  return (
    <Card>
      <h2>{title}</h2>
      {tasks.map((task, key) => (
        <div key={key}>{task.description}</div>
      ))}
      <Textbox
        required={true}
        label="New task"
        onChange={({ target }) => setNewTask(target.value)}
        value={newTask}
      />
    </Card>
  );
};

export default Todo;
