import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
  title: 'TodoList/Task',
  component: Task
} as Meta

const Template: Story<TaskPropsType> = (args) => <Task {...args} />

const baseArgs = {
  changeTaskStatus: action('changeTaskStatus'),
  changeTaskTitle: action('changeTaskTitle'),
  removeTask: action('removeTask'),
}

export const TaskisDoneExample = Template.bind({})
TaskisDoneExample.args = {
  ...baseArgs,
  task: {id: '1', title: 'JS', isDone: true},
  todolistId: '11'
}

export const TaskisNoteDoneExample = Template.bind({})
TaskisNoteDoneExample.args = {
  ...baseArgs,
  task: {id: '1', title: 'JS', isDone: false},
  todolistId: '11'
}