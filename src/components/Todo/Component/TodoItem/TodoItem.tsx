/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useContext } from 'react';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import classnames from 'classnames/bind';
import styles from './TodoItem.module.scss';
import { TaskInfoAPI } from '@/store/interface';
import 'react-toastify/dist/ReactToastify.css';
import {
  isDeadline,
  isTimeOut,
  showTime
} from 'src/utils/deadline';
import moment from 'moment';

const cx = classnames.bind(styles);

interface Props {
  job: TaskInfoAPI
  handleEdit: Function
  currentTime: string
}

const TodoItem: React.FC<Props> = (props) => {
  const { deleteTodo, changeStatusTodo } = useContext(GlobalContextProvider);
  const { job, handleEdit, currentTime } = props;
  const timeTarget = showTime(job.deadline);
  const deadline = isDeadline(job.deadline, job.completed);
  const expire = isTimeOut(job.deadline, job.completed);

  const timeDeadline = moment(job.deadline).from(currentTime);

  return (
    <li className={cx('task__list-item', `${job.completed ? 'COMPLETED' : 'PENDING'}`)}>
      <input
        type="checkbox"
        className={cx('task-completed-check')}
        defaultChecked={job.completed}
        onChange={() => {
          changeStatusTodo(job);
        }} />

      <span className={cx('list-item-info')}>{job.title}</span>
      {job.deadline &&
        (
          <span className={cx('list-item-info')}>
            <div>
              {timeTarget}
            </div>
            {deadline && <div className={cx('time-left')}>{timeDeadline}</div>}
            {expire && (
              <div className={cx('time-out')}>
                Time out
              </div>
            )}
          </span>
        )}
      <button className={cx('list-item-btn')} onClick={() => handleEdit(job.id)}>Edit</button>
      <button className={cx('list-item-btn')} onClick={() => deleteTodo(job.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
