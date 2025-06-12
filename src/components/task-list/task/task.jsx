import { useState, useEffect } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export default function Task(props) {
  const [editingInputValue, setEditingInputValue] = useState('')
  const [date, setDate] = useState(formatDistanceToNow(props.todo.createdDate, { includeSeconds: true }))
  const index = props.todoList
    .map(function (el) {
      return el.id
    })
    .indexOf(props.id)

  useEffect(() => {
    const id = setInterval(() => {
      setDate(formatDistanceToNow(props.todo.createdDate, { includeSeconds: true }))
    }, 5000)

    return () => clearInterval(id) // Очистка при размонтировании
  }, [])

  function destroyElement() {
    let newTodoList = [...props.todoList]

    if (props.todo.intervalId) clearInterval(props.todo.intervalId)

    newTodoList = [...newTodoList.slice(0, index), ...newTodoList.slice(index + 1)]

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
    let newTodoList = props.todoList
    const value = editingInputValue

    event.preventDefault()

    if (value && value[0] !== ' ') {
      newTodoList[index].value = value
      props.todoListSetter(newTodoList)
    }

    event.target.firstChild.blur()
  }

  function playTimer() {
    if (!props.todo.intervalId) {
      let counter = props.todo.timer
      let newTodo = props.todo
      const id = setInterval(() => {
        console.log('Tick')
        if (counter <= 0) {
          pauseTimer(id)
          counter = 0
        } else {
          counter--
        }
        newTodo.timer = counter
        props.todoListSetter((prev) => {
          const index = prev
            .map(function (el) {
              return el.id
            })
            .indexOf(props.id)

          if (index) {
            prev[index] = newTodo
          }
          return [...prev]
        })
      }, 1000)
      let newTodos = [...props.todoList]
      newTodos[index].intervalId = id
      props.todoListSetter(newTodos)
    }
  }

  function pauseTimer(id = props.todo.intervalId) {
    console.log(`id: ${id}`)
    if (id) {
      clearInterval(id)
      let newTodos = [...props.todoList]
      newTodos[index].intervalId = null
      props.todoListSetter(newTodos)
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
    console.log('inner')
    const index = props.todoList
      .map((el) => {
        return el.id
      })
      .indexOf(props.id)
    const completed = props.todoList[index].completed

    props.todoListSetter((prev) => {
      console.log(index)

      if (index || index === 0) {
        prev[index].completed = !completed
        console.log(prev[index].completed)

        if (prev[index].completed) {
          prev[index].style = { ...prev[index].style, color: '#cdcdcd', textDecoration: 'line-through' }
        } else prev[index].style = { ...prev[index], color: '#4d4d4d', textDecoration: 'none' }
      }
      return [...prev]
    })
  }

  return (
    <li data-item-id={props.id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={() => {
            console.log('onChangeToggle')
            toggleCheckbox()
          }}
        />
        <label>
          <span className="title" style={props.todo.style}>
            {props.todo.value}
          </span>
          <span className="description">
            <button className="icon icon-play" onClick={() => playTimer()}></button>
            <button className="icon icon-pause" onClick={() => pauseTimer()}></button>
            <span>{convertTimer(props.todo.timer)}</span>
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
