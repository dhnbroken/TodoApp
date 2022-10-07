import { Status } from './enum';
export const intialState = {
  job: {
    id: 0,
    status: Status.PENDING,
    title: '',
    completed: false,
    deadline: ''
  },
  jobs: [],
  setEdit: false,
  editId: 0,
  editDeadline: ''
};
