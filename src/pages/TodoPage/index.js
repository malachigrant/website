/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Col } from 'components/layout';
import { useBox } from 'hooks/useBox';
import Todo from './Todo';

export const TodoPage = () => {
  const [todos, addTodo] = useBox();
  return (
    <Col width={4 / 5}>
      <button
        onClick={() =>
          addTodo({ title: 'Hello', tasks: [{ description: 'Do something' }] })
        }
        value="Hi"
      >
        Hello
      </button>
      {todos.map((todo, key) => {
        return <Todo key={key} value={todo} />;
      })}
    </Col>
  );
};

export default TodoPage;
