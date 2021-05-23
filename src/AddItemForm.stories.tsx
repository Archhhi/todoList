import React from "react";
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm
} as Meta

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {
  addItem: action('Button inside')
}