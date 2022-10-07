/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TaskInfoAPI, TaskState, PropsProvider } from 'src/store/interface';
import React, { createContext, useReducer, useState } from 'react';
import taskReducer from 'src/store/reducer';
import { intialState } from 'src/store/constants';
import * as actions from 'src/store/actions';
import { TodoContext } from './TodoContext';
import moment from 'moment';

export interface GlobalContext {
  state: TaskState
  taskInput: string
  setTaskInput: (input: string) => void
  selectDate: string
  setSelectDate: (input: string) => void
  inputDate: string
  setInputDate: (input: string) => void
  getTodo: (jobs: TaskInfoAPI[]) => void
  setTodo: (payload: TaskInfoAPI) => void
  addTodo: (payload: TaskInfoAPI) => void
  deleteTodo: (payload: number) => void
  updateTodo: (payload: TaskInfoAPI) => void
  changeStatusTodo: (payload: TaskInfoAPI) => void
}

export const GlobalContextProvider = createContext<GlobalContext>(TodoContext);
export const GlobalStoreContext = ({ children }: PropsProvider) => {
  const todayDate = moment().format('yyyy-MM-DTHH:mm');

  const [taskInput, setTaskInput] = useState('');
  const [inputDate, setInputDate] = useState(todayDate);
  const [selectDate, setSelectDate] = useState(todayDate);

  const [state, dispatch] = useReducer(taskReducer, intialState);
  const getTodo = (jobs: TaskInfoAPI[]) => dispatch(actions.getTodoApi(jobs));
  const setTodo = (payload: TaskInfoAPI) => dispatch(actions.setTodoInput(payload));
  const addTodo = (payload: TaskInfoAPI) => dispatch(actions.addTodoInput(payload));
  const deleteTodo = (payload: number) => dispatch(actions.deleteTodoInput(payload));
  const updateTodo = (payload: TaskInfoAPI) => dispatch(actions.updateTodoInput(payload));
  const changeStatusTodo = (payload: TaskInfoAPI) => dispatch(actions.changeStatus(payload));

  const valueContext = {
    state,
    taskInput,
    setTaskInput,
    selectDate,
    setSelectDate,
    inputDate,
    setInputDate,
    getTodo,
    setTodo,
    addTodo,
    deleteTodo,
    updateTodo,
    changeStatusTodo
  };
  return <GlobalContextProvider.Provider value={valueContext}>
    {children}
  </GlobalContextProvider.Provider>;
};
