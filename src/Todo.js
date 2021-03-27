import React from 'react';

export default function Todo({todo, toggleTodo}) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <div className="flex mt-2 todo-task border-radius-3">
      <label className="flex vertical-center anim-ltr-ease auto-mlr-2">
          <span className="middle" title="task name">{todo.name}</span>
          <input className="flex-end" type="checkbox" checked={todo.complete} onChange={handleTodoClick} title="status" />
      </label>
    </div>
  );
}
