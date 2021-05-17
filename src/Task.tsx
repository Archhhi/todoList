import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
  task: TaskType
  changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
  removeTask: (taskId: string) => void
  changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task = React.memo((
  {
    task,
    changeTaskStatus,
    changeTaskTitle,
    removeTask
  }: TaskPropsType) => {

  const onClickHandler = useCallback(() => removeTask(task.id), [removeTask])
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    changeTaskStatus(task.id, newIsDoneValue);
  }, [changeTaskStatus])
  const onTitleChangeHandler = useCallback((newValue: string) => {
    changeTaskTitle(task.id, newValue);
  }, [changeTaskTitle])

  return (
    <div key={task.id} className={task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={task.isDone}
        color="primary"
        onChange={onChangeHandler}
      />

      <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})