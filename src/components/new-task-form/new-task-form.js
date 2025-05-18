import { useState } from 'react'

import './new-task-form.css'

export default function NewTaskForm(props) {
  const [todo, setTodo] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  function resetNewTaskForm() {
    setTodo('')
    setMin('')
    setSec('')
  }

  function addTask(event) {
    event.preventDefault()
    const numberedMin = Number(min)
    const numberedSec = Number(sec)

    if (todo && todo[0] !== ' ') {
      if (!Number.isNaN(numberedMin) && !Number.isNaN(numberedSec)) {
        props.todoListSetter((prev) => [...prev, todo])
        props.setItemsLeft((prev) => prev + 1)
        props.setTimers((prev) => [...prev, numberedMin * 60 + numberedSec])

        resetNewTaskForm()
      }
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={addTask} className="new-todo-form">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="new-todo"
          placeholder="Task"
          autoFocus=""
        />
        <input
          value={min}
          onChange={(e) => setMin(e.target.value)}
          className="new-todo-form__timer new-todo-form__timer--min"
          placeholder="Min"
        />
        <input
          value={sec}
          onChange={(e) => setSec(e.target.value)}
          className="new-todo-form__timer new-todo-form__timer--sec"
          placeholder="Sec"
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}
