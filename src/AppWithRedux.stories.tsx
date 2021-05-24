import React from "react";
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'TodoList/AppWithReduxExample',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as Meta

export const AppWithReduxExample: Story = () => <AppWithRedux/>