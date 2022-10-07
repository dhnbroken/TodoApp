/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { ActionKind, Status } from './enum';
import { TaskAction, TaskInfoAPI, TaskState } from './interface';

function taskReducer (state: TaskState, action: TaskAction): TaskState {
  const { type } = action;
  switch (type) {
    case ActionKind.GETJOB:
      if (action.payload) {
        return {
          ...state,
          jobs: action.payload
        };
      }
      return state;
    case ActionKind.SETJOB:
      return {
        ...state,
        job: {
          id: action.payload.id,
          title: action.payload.title,
          completed: false,
          status: Status.PENDING,
          deadline: action.payload.deadline
        }
      };
    case ActionKind.ADDJOB:
      const newJob: TaskInfoAPI = {
        id: action.payload.id,
        status: Status.PENDING,
        title: action.payload.title,
        completed: false,
        deadline: action.payload.deadline
      };
      return {
        ...state,
        jobs: [...state.jobs, newJob]
      };
    case ActionKind.DELETEJOB: {
      const deletedJob = state.jobs.filter((job: TaskInfoAPI) => job.id !== action.payload);
      return {
        ...state,
        jobs: deletedJob
      };
    }
    case ActionKind.UPDATEJOB:
      const updateJobs = state.jobs.map((job: TaskInfoAPI) => {
        return job.id === action.payload.id
          ? { ...action.payload }
          : job;
      });

      return {
        ...state,
        jobs: updateJobs
      };
    case ActionKind.CHANGESTATUS:{
      const newJobs = state.jobs.map((job: TaskInfoAPI) => {
        return job.id === action.payload.id
          ? {
              ...action.payload,
              completed: !action.payload.completed,
              status: !action.payload.completed ? Status.COMPLETED : Status.PENDING
            }
          : job;
      });
      return {
        ...state,
        jobs: newJobs
      };
    }
    default:
      return state;
  }
}

export default taskReducer;
