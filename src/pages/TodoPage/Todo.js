/** @jsx jsx */
import { jsx } from '@emotion/core';

import Card from 'components/Card';

export const Todo = ({ value }) => {
  const { title, tasks } = value;
  return (
    <Card>
      <h2>{title}</h2>
      {tasks.map((task, key) => (
        <div key={key}>{task.description}</div>
      ))}
    </Card>
  );
};

export default Todo;
