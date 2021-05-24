import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />

const baseArgs = {
  onChange: action('action onChange'),
}

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
  ...baseArgs,
  value: 'New Title'
}