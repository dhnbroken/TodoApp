/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Sidebar from 'src/components/Sidebar/Sidebar';
import Todo from 'src/components/Todo/Todo';
import styles from './Container.module.scss';
import { TaskInfoAPI } from 'src/store/interface';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import * as todosAPI from 'src/API/todoApi';

const cx = classNames.bind(styles);

const Container: React.FC = () => {
  const [taskAPI, setTaskAPI] = useState<TaskInfoAPI[]>([]);
  const { getTodo } = useContext(GlobalContextProvider);

  const getTaskAPI = async () => {
    try {
      const response = await todosAPI.getTodoAPI();
      setTaskAPI(response);
    } catch (err) {
    }
  };

  useEffect(() => {
    getTaskAPI();
  }, []);

  useEffect(() => {
    getTodo(taskAPI);
  }, [taskAPI]);

  return (
    <div className={cx('container')}>
      <Sidebar />
      <Todo/>
    </div>
  );
};

export default Container;
