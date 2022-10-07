/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { MutableRefObject, useRef } from 'react';
import classnames from 'classnames/bind';
import styles from './Todo.module.scss';
import TodoList from './Component/TodoList/TodoList';
import TodoInput from './Component/TodoInput/TodoInput';

const cx = classnames.bind(styles);
// move API to container
const Todo: React.FC = () => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <div className={cx('todo')}>
      <TodoInput inputRef={inputRef} />
      <TodoList inputRef={inputRef} />
    </div>
  );
};

export default Todo;
