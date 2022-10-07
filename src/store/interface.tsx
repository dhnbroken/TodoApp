import { ActionKind } from './enum';
export type TaskAction =
| Get
| Set
| Add
| Update
| Delete
| ChangeStatus;

export interface Get {
  type: ActionKind.GETJOB
  payload: TaskInfoAPI[]
}

export interface Actions {
  type: string
  payload: TaskInfoAPI
}

export interface Set extends Actions{
  type: ActionKind.SETJOB
}

export interface Add extends Actions{
  type: ActionKind.ADDJOB
}

export interface Update extends Actions{
  type: ActionKind.UPDATEJOB
}

export interface ChangeStatus extends Actions{
  type: ActionKind.CHANGESTATUS
}

export interface Delete {
  type: ActionKind.DELETEJOB
  payload: number
}

export interface TaskInfoAPI {
  id: number
  title: string
  completed: boolean
  status: string
  deadline: string
}

export interface TaskState {
  job: TaskInfoAPI
  jobs: TaskInfoAPI[]
  setEdit: boolean
}

export interface Props {
  taskAPI: TaskInfoAPI[]
  count: number
  pending: number
}

export interface PropsProvider {
  children: React.ReactNode
}
