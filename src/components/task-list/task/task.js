import { useState, useRef, useEffect } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export default function Task(props) {
  const dateNow = useRef(Date.now())
  const [intervalId, setIntervalId] = useState(null)
  const [timer, setTimer] = useState(props.timer)
  const [editingInputValue, setEditingInputValue] = useState('')
  const [date, setDate] = useState(formatDistanceToNow(dateNow.current, { includeSeconds: true }))

  useEffect(() => {
    const id = setInterval(() => {
      setDate(formatDistanceToNow(dateNow.current, { includeSeconds: true }))
    }, 5000)

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

  function destroyElement(event) {
    const listItem = event.target.parentElement.parentElement
    const newTodoList = props.todoList

    delete newTodoList[props.index]
    listItem.className !== 'completed' ? props.todoListSetter(newTodoList) : props.todoListSetter([...newTodoList])

    if (listItem.className !== 'completed') props.setItemsLeft(props.itemsLeft - 1)
  }

  function editElement(event) {
    const listItem = event.target.parentElement.parentElement
    const title = listItem.querySelector('.title')
    const editInput = listItem.querySelector('.edit')
    const view = listItem.querySelector('.view')

    listItem.classList.toggle('editing')

    view.style = 'display: none;'
    editInput.value = title.innerHTML
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
      newTodoList[props.index] = value
      title.innerHTML = value
      props.todoListSetter(newTodoList)
    }

    event.target.firstChild.blur()
  }

  function toggleElement(event) {
    const filterButton = document.querySelector('.selected')
    const listItem = event.target.parentElement.parentElement

    if (listItem.className !== 'completed') {
      listItem.className = 'completed'
      props.setItemsLeft(props.itemsLeft - 1)
    } else {
      listItem.className = ''
      props.setItemsLeft(props.itemsLeft + 1)
    }

    filterButton.click()
  }

  function playTimer() {
    if (!intervalId) {
      const id = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            pauseTimer()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setIntervalId(id) // Сохраняем ID интервала
    }
  }

  function pauseTimer() {
    if (intervalId) {
      clearInterval(intervalId)
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

    editInput.style = 'display: none;'
    event.target.value = ''
    view.style = 'display: block;'

    listItem.classList.toggle('editing')
    setEditingInputValue(title.innerHTML)
  }

  return (
    <li data-item-id={props.index}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={toggleElement} />
        <label>
          <span className="title">{props.todo}</span>
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
