import { Status } from 'src/store/enum';

export const TodoContext = {
  taskInput: '',
  setTaskInput: () => {},
  selectDate: '',
  setSelectDate: () => {},
  inputDate: '',
  setInputDate: () => {},
  state: {
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
  },
  getTodo: () => {},
  setTodo: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  updateTodo: () => {},
  changeStatusTodo: () => {}
};
