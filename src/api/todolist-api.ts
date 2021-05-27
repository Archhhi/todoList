import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'a422b91f-124a-4b18-8f18-effef6e13fe2'
  }
})

type TodoType= {
  id: string
  addedDate: string
  order: number
  title: string
}
type CommonResponseType<T> = {
  resultCode: number
  messages: Array<string>
  fieldsError: Array<string>
  data: T
}

export const todoAPI = {
  getTodos() {
    return instance.get<TodoType[]>(`todo-lists`)
  },
  createTodo(title: string) {
    return instance.post<CommonResponseType<{item: TodoType}>>(`todo-lists`, {title})
  },
  deleteTodo(todoId: string) {
    return instance.delete<CommonResponseType<{}>>(`todo-lists/${todoId}`)
  },
  updateTodo(todoId: string, title: string) {
    return instance.put<CommonResponseType<{}>>(`todo-lists/${todoId}`, {title})
  }
}