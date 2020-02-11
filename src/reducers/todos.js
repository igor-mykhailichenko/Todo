import {
  ADD_TODO,
  REMOVE_TODO,
  DONE_TODO,
  SHOW_FILTER,
  SELECT_ALL,
  DELETE_ALL
} from "../actions/ActionTypes";

const initialState = {
  list: [],
  mode: "all",
  all: false
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const todo = {
        id: `${Math.random() * Math.random()}`,
        status: "active",
        name: action.todo
      };

      return { ...state, list: [...state.list, todo] };
    case REMOVE_TODO:
      return { ...state, list: state.list.filter(item => item.id !== action.id) };
    case DONE_TODO:
      const index = state.list.findIndex(item => item.id === action.id);
      const list = state.list.slice();

      if (action.checked) {
        list[index].status = "done";
      } else {
        list[index].status = "active";
      }
      return { ...state, list };
    case SHOW_FILTER:
      return { ...state, mode: action.filter };
      // Change "mode"

      // if (action.filter === "done") {
      //   return { ...state, list: state.list.filter(el => el.status === "done") };
      // }
      // if (action.filter === "active") {
      //   return { ...state, list: state.list.filter(el => el.status === "active") };
      // }
      return state;
    case SELECT_ALL:
      const newList = state.list.slice();

      if (state.all) {
        newList.forEach((element) => {
          element.status = "active";
        });
      } else {
        newList.forEach((element) => {
          element.status = "done";
        });
      }
      return { ...state, all: !state.all, list: newList };
    case DELETE_ALL:
      const newList1 = state.list.slice();

      for (let i = 0; i < newList1.length; i += 1) {
        if (newList1[i].status === "done") {
          newList1.splice(i, 1);
          i -= 1;
        }
      }
      return { ...state, list: newList1 };
    default:
      return state;
  }
};

export default todoReducer;