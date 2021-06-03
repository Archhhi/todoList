import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodosAC, SetTodosActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type AddTaskActionType = {
  type: 'ADD-TASK',
  task: any
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosActionType
  | SetTasksActionType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET_TODOLISTS':
      const stateCopy1 = {...state}
      action.todos.forEach(tl => {
        stateCopy1[tl.id] = []
      })
      return stateCopy1
    case "SET_TASKS":
      const stateCopy = {...state}
      stateCopy[action.todoId] = action.tasks
      return stateCopy
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [{...action.task}, ...state[action.task.todoListId]]
      }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId];
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId];
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

      state[action.todolistId] = newTasksArray;
      return ({...state});
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state};
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export type SetTasksActionType = ReturnType<typeof setTasksAC>

export const setTasksAC = (tasks: TaskType[], todoId: string) => {
  return {
    type: 'SET_TASKS', tasks, todoId
  } as const
}


export const fetchTasksThunkAC = (todoId: string) => (dispatch: Dispatch) => {
  todolistsAPI.getTasks(todoId).then(res => dispatch(setTasksAC(res.data.items, todoId)))
}
export const deleteTaskThunkAC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTask(todoId, taskId).then(() => dispatch(removeTaskAC(taskId, todoId)))
}
export const addTaskThunkAC = (todoId: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTask(todoId, title)
    .then((res) => {
      dispatch(addTaskAC(res.data.data.item))
    })
}
export const changeTaskStatusThunkAC = (todoId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  let state = getState()

  const allTasks = state.tasks
  const tasksForCurrentTodo = allTasks[todoId]

  let updatedTask = tasksForCurrentTodo.find((task) => {
    return task.id === taskId
  })

  if (updatedTask) {

    const model = {...updatedTask, status}

    // const model: any = {
    //   title: updatedTask.title,
    //   status: status,
    //   deadline: updatedTask.deadline,
    //   description: updatedTask.description,
    //   priority: updatedTask.priority,
    //   statDate: updatedTask.startDate
    // }

    todolistsAPI.updateTask(todoId, taskId, model)
      .then((res) => {
        const newTask = res.data.data.item
        dispatch(changeTaskStatusAC(newTask.id, newTask.status, newTask.todoListId))
      })
  }
}