import React from 'react';

type TaskPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    return (
      <></>
    )
})