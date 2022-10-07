/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { MutableRefObject, useContext, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './TodoInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import moment from 'moment';
import { TaskInfoAPI } from '@/store/interface';
const cx = classnames.bind(styles);

interface TaskCardProps {
  inputRef: MutableRefObject<HTMLInputElement>
}

const TodoInput: React.FC<TaskCardProps> = (props) => {
  const { state, taskInput, inputDate, selectDate, setSelectDate, setTaskInput, setInputDate, addTodo, setTodo, updateTodo } = useContext(GlobalContextProvider);
  const { inputRef } = props;
  const todayDate = moment().format('yyyy-MM-DTHH:mm');
  const expire = moment(selectDate).isBefore(moment());
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (taskInput.trim() && !expire) {
      const newJob: TaskInfoAPI = {
        id: state.jobs.length + 1,
        title: taskInput,
        completed: false,
        status: 'PENDING',
        deadline: selectDate
      };
      addTodo(newJob);
      setTodo(newJob);
      setErrorMessage('');
    } else if (!taskInput.trim()) {
      setErrorMessage('Please fill in the task input');
    } else if (expire) {
      setErrorMessage('Invalid time, please pick a different time');
    }
    setTaskInput('');
    setInputDate(todayDate);
    inputRef.current.focus();
  };

  const handleUpdate = () => {
    if (taskInput.trim()) {
      const newJob: TaskInfoAPI = {
        id: state.job.id,
        title: taskInput,
        completed: state.job.completed,
        status: state.job.status,
        deadline: selectDate
      };
      updateTodo(newJob);
      setTodo(state.job);
      setTaskInput('');
      state.setEdit = false;
    }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      !state.setEdit ? handleSubmit() : handleUpdate();
    }
  };

  return (
    <div className={cx('task__card')}>
      <div className={cx('task__card-input')}>
        <div className={cx('task__card-input-icon')}>
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </div>
        <input className={cx('task-input')}
          ref={inputRef}
          value={taskInput}
          type="text"
          placeholder="Input task"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTaskInput(e.target.value);
          }}
          onKeyUp={handleKeypress}
        />
      </div>
      <div className={cx('task__card-input-error')}>{errorMessage}</div>
      <div className={cx('task__card-custom')}>
        <div className={cx('task__card-wrapper')}>
          <div className={cx('task__card-icon')}>
            <div className={cx('task__card-time-icon')}>
              <input type="datetime-local" id="start" name="trip-start" max="2032-12-31"
                value={inputDate}
                min={todayDate}
                onChange={(e) => {
                  setSelectDate(e.target.value);
                  setInputDate(e.target.value);
                }}
              />
            </div>
            <div className={cx('task__card-icons')}>
              <FontAwesomeIcon icon={['far', 'bell']} />
            </div>
            <div className={cx('task__card-icons')}>
              <FontAwesomeIcon icon={['fas', 'repeat']} />
            </div>
          </div>
          <button
            className={cx('task__card-btn', `${!taskInput.trim() && 'deactivated'}`)}
            onClick={() => {
              !state.setEdit ? handleSubmit() : handleUpdate();
            }}
          >
            {!state.setEdit ? 'Add' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
