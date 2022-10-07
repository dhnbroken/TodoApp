/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { MutableRefObject, useContext, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './TodoList.module.scss';
import { TaskInfoAPI } from 'src/store/interface';
import { Status } from 'src/store/enum';
import TodoItem from '../TodoItem/TodoItem';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import moment from 'moment';
import { isTimeOut } from 'src/utils/deadline';

const cx = classnames.bind(styles);

interface TodoProps {
  inputRef: MutableRefObject<HTMLInputElement>
}

const TodoStatus: React.FC<TodoProps> = (props) => {
  const { state, setTaskInput, setInputDate, setTodo } = useContext(GlobalContextProvider);
  const { inputRef } = props;
  const { job, jobs } = state;
  const [status, setStatus] = useState('ALL');

  const pending = state.jobs.filter((job: TaskInfoAPI) => !job.completed).length;
  const count = state.jobs.length;
  const [currentTime, setCurrentTime] = useState(moment().format('YYYY-MM-DDTHH:mm:ss'));
  useEffect(() => {
    if (job.deadline) {
      const interval = setInterval(() => {
        const getCurrentTime = moment().format('YYYY-MM-DDTHH:mm:ss');
        setCurrentTime(getCurrentTime);
        if (isTimeOut(job.deadline, job.completed)) {
          clearInterval(interval);
        }
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [jobs]);

  const jobsRender = useMemo(() => {
    const newJobs = (
      status === Status.ALL
        ? state.jobs
        : state.jobs.filter((job: TaskInfoAPI) => job.completed
          ? status === Status.COMPLETED
          : status === Status.PENDING)
    );
    return newJobs;
  }, [status, state.jobs]);

  const handleEdit = (id: number) => {
    const currentTodo = state.jobs.find((job: TaskInfoAPI) => job.id === id);
    if (currentTodo) {
      setTaskInput(currentTodo.title);
      setTodo(currentTodo);
      setInputDate(currentTodo.deadline);
    }
    inputRef.current.focus();
    state.setEdit = true;
  };

  return (
    <React.Fragment>
      <div className={cx('task__status')}>
        <button className={cx('task__status-btn', 'task__status-all')} onClick={() => setStatus('ALL')}>All - {count}</button>
        <button className={cx('task__status-btn', 'task__status-pending')} onClick={() => setStatus('PENDING')}>Pending - {pending} </button>
        <button className={cx('task__status-btn', 'task__status-completed')} onClick={() => setStatus('COMPLETED')}>Completed - {count - pending} </button>
      </div>
      <ul className={cx('task__list')}>
        <div>
          {jobsRender.map((job: TaskInfoAPI): any => (
            <TodoItem key={job.id} job={job} handleEdit={handleEdit} currentTime={currentTime}/>
          )).reverse()}
        </div>
      </ul>
    </React.Fragment>
  );
};

export default TodoStatus;
