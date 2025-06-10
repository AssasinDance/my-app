import { useState } from 'react'

import './new-task-form.css'

export default function NewTaskForm(props) {
  const [todo, setTodo] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')
  const [idCounter, setIdCounter] = useState(0)

  function resetNewTaskForm() {
    setTodo('')
    setMin('')
    setSec('')
  }

  function addTask(event) {
    event.preventDefault()
    const numberedMin = Number(min)
    const numberedSec = Number(sec)

    setIdCounter((prev) => prev + 1)

    if (todo && todo[0] !== ' ') {
      if (!Number.isNaN(numberedMin) && !Number.isNaN(numberedSec)) {
        props.todoListSetter((prev) => [
          ...prev,
          {
            value: todo,
            completed: false,
            id: idCounter,
            style: {},
            edited: false,
            timer: numberedMin * 60 + numberedSec,
          },
        ])

        resetNewTaskForm()
      }
    }
  }

  function validateNumberInput(event) {
    const char = event.target.value.at(-1)

    if (char >= '0' && char <= '9') {
      return
    } else {
      event.target.value = event.target.value.slice(0, -1)
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
          onChange={(e) => {
            validateNumberInput(e)
            setMin(e.target.value)
          }}
          className="new-todo-form__timer new-todo-form__timer--min"
          placeholder="Min"
        />
        <input
          value={sec}
          onKeyDown={(e) => validateNumberInput(e)}
          onChange={(e) => {
            validateNumberInput(e)
            setSec(e.target.value)
          }}
          className="new-todo-form__timer new-todo-form__timer--sec"
          placeholder="Sec"
        />
        <button type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}
