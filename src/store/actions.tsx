/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ActionKind } from './enum';
import { Add, ChangeStatus, Delete, Get, Set, TaskInfoAPI, Update } from './interface';

export const getTodoApi = (payload: TaskInfoAPI[]): Get => ({
  type: ActionKind.GETJOB,
  payload
});

export const setTodoInput = (payload: TaskInfoAPI): Set => ({
  type: ActionKind.SETJOB,
  payload
});

export const addTodoInput = (payload: TaskInfoAPI): Add => ({
  type: ActionKind.ADDJOB,
  payload
});

export const updateTodoInput = (payload: TaskInfoAPI): Update => ({
  type: ActionKind.UPDATEJOB,
  payload
});

export const deleteTodoInput = (payload: number): Delete => ({
  type: ActionKind.DELETEJOB,
  payload
});

export const changeStatus = (payload: TaskInfoAPI): ChangeStatus => ({
  type: ActionKind.CHANGESTATUS,
  payload
});
