import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  
  
  function handleTodoAdd(e) {
    const name = todoRef.current.value
    if(name === '') return
    setTodos(prevTodo => {
      return [...prevTodo, {id: uuidv4(), name: name, complete: false}]
    })
    todoRef.current.value = null
  }
  
  
  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find((t) => t.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  const clearTodos = () => {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="container horizontal-center">
      <h1 className="center tsh-1">Todo List by Mahesh Muttinti</h1>
      <p className="center">
        <span className="step-count-anim clear">{todos.filter(todo => !todo.complete).length}</span> Tasks Left
      </p>
      <div className="flex-row equal-spaces">
        <input title="Enter your task" aria-label="Enter your task name" ref={todoRef} type="text" name="todoTask" className="input-field" />
        <button title="add task" aria-label="Add Task" className="btn btn-primary" onClick={handleTodoAdd}>Add Task</button>
        <button title="clear completed tasks" aria-label="Clear completed tasks" className="btn btn-danger" onClick={clearTodos}>Clear Completed Tasks</button>
      </div>
      <TodoList todos ={todos} toggleTodo={toggleTodo} />
    </div>
  );
}

export default App;
