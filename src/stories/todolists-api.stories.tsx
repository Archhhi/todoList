import React, {useEffect, useState} from 'react'
import {todoAPI} from "../api/todolist-api";

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todoAPI.getTodos()
      .then(res => {
        setState(res.data[0].title)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'React'
    todoAPI.createTodo(title)
      .then( (res) => {
      setState(res.data);
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '0ac6053c-0865-470b-a967-2e74348d9869';
    todoAPI.deleteTodo(todolistId)
      .then( (res) => {
      setState(res.data);
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'c5c966ed-514a-4253-9aff-91e0b25ec92d';
    const title = 'REACT>>>>>>>>>'
    todoAPI.updateTodo(todolistId, title)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}