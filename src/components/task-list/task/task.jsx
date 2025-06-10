import { useState, useRef, useEffect } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export default function Task(props) {
  const dateNow = useRef(Date.now())
  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const [editingInputValue, setEditingInputValue] = useState('')
  const [date, setDate] = useState(formatDistanceToNow(dateNow.current, { includeSeconds: true }))

  useEffect(() => {
    const id = setInterval(() => {
      setDate(formatDistanceToNow(dateNow.current, { includeSeconds: true }))
    }, 5000)

    setTimer(props.todoList[props.index].timer)

    return () => clearInterval(id) // Очистка при размонтировании
  }, [])

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  function destroyElement() {
    let newTodoList = [...props.todoList]

    newTodoList = [...newTodoList.slice(0, props.index), ...newTodoList.slice(props.index + 1)]

    props.todoListSetter(newTodoList)
  }

  function editElement(event) {
    const listItem = event.target.parentElement.parentElement
    const titleValue = listItem.querySelector('.title').innerHTML
    const editInput = listItem.querySelector('.edit')
    const view = listItem.querySelector('.view')

    listItem.classList.toggle('editing')

    setEditingInputValue(titleValue)

    view.style = 'display: none;'
    editInput.style = 'display: block;'
    editInput.focus()
  }

  function submitEditedElement(event) {
    const listItem = event.target.parentElement
    let title = listItem.querySelector('.title')
    let newTodoList = props.todoList
    const value = editingInputValue

    event.preventDefault()

    if (value && value[0] !== ' ') {
      newTodoList[props.index] = { ...props.todoList[props.index], value: value }
      title.innerHTML = value
      props.todoListSetter(newTodoList)
    }

    event.target.firstChild.blur()
  }

  function playTimer() {
    if (!intervalId) {
      let counter = timer
      const id = setInterval(() => {
        if (counter <= 0) {
          pauseTimer(id)
          setTimer(0)
          counter = 0
        } else {
          counter--
          setTimer((prev) => prev - 1)
        }
      }, 1000)
      setIntervalId(id) // Сохраняем ID интервала
    }
  }

  function pauseTimer(id = intervalId) {
    if (id) {
      let newTodos = [...props.todoList]
      newTodos[props.index] = { ...newTodos[props.index], timer: timer }
      props.todoListSetter(newTodos)
      clearInterval(id)
      setIntervalId(null)
    }
  }

  function convertTimer(timer) {
    let minutes = String(Math.floor(timer / 60))
    let seconds = timer % 60 > 9 ? String(timer % 60) : '0' + String(timer % 60)

    return `${minutes}:${seconds}`
  }

  function cancelEditing(event) {
    const listItem = event.target.parentElement.parentElement
    const editInput = listItem.querySelector('.edit')
    const view = listItem.querySelector('.view')
    const title = listItem.querySelector('.title')

    event.preventDefault()

    setEditingInputValue('')

    editInput.style = 'display: none;'
    view.style = 'display: block;'

    listItem.classList.toggle('editing')
    setEditingInputValue(title.innerHTML)
  }

  function toggleCheckbox() {
    let newTodoList = [...props.todoList]

    newTodoList[props.index] = { ...newTodoList[props.index], completed: !newTodoList[props.index].completed }
    props.todoListSetter(newTodoList)

    if (!props.todo.completed) {
      newTodoList[props.index] = {
        ...newTodoList[props.index],
        style: { ...newTodoList[props.index].style, color: '#cdcdcd', textDecoration: 'line-through' },
      }
    } else
      newTodoList[props.index] = {
        ...newTodoList[props.index],
        style: { ...newTodoList[props.index], color: '#4d4d4d', textDecoration: 'none' },
      }
  }

  return (
    <li data-item-id={props.index}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={props.todo.completed} onChange={() => toggleCheckbox()} />
        <label>
          <span className="title" style={props.todo.style}>
            {props.todo.value}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => playTimer()}></button>
            <button className="icon icon-pause" onClick={() => pauseTimer()}></button>
            <span>{convertTimer(timer)}</span>
          </span>
          <span className="created">{'created ' + date + ' ago'}</span>
        </label>
        <button className="icon icon-edit" onClick={editElement} />
        <button className="icon icon-destroy" onClick={destroyElement} />
      </div>
      <form
        className="edit-form"
        onSubmit={(e) => submitEditedElement(e)}
        onBlur={(e) => cancelEditing(e)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') e.target.blur()
        }}
      >
        <input
          type="text"
          className="edit"
          value={editingInputValue}
          onChange={(e) => setEditingInputValue(e.target.value)}
        />
      </form>
    </li>
  )
}
