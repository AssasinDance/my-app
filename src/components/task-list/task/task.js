import { useState, useRef, useCallback } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'

export default function Task(props) {
  const dateNow = useRef(Date.now())
  const [date, setDate] = useState(formatDistanceToNow(dateNow.current, { includeSeconds: true }))
  useCallback(
    setInterval(() => {
      setDate(formatDistanceToNow(dateNow.current, { includeSeconds: true }))
    }, 5000),
    []
  )

  function destroyElement(event) {
    const listItem = event.target.parentElement.parentElement
    const newTodoList = props.todoList

    delete newTodoList[props.index]
    listItem.className !== 'completed' ? props.todoListSetter(newTodoList) : props.todoListSetter([...newTodoList])

    if (listItem.className !== 'completed') props.setItemsLeft(props.itemsLeft - 1)
  }

  function editElement(event) {
    const listItem = event.target.parentElement.parentElement
    const description = listItem.querySelector('.description')
    const editInput = listItem.querySelector('.edit')
    const view = listItem.querySelector('.view')

    listItem.classList.toggle('editing')

    view.style = 'display: none;'
    editInput.value = description.innerHTML
    editInput.style = 'display: block;'
    editInput.focus()
  }

  function submitEditedElement(event) {
    const listItem = event.target.parentElement
    let description = listItem.querySelector('.description')
    const editInput = listItem.querySelector('.edit')
    const view = listItem.querySelector('.view')
    const value = event.target.firstChild.value

    event.preventDefault()
    let newTodoList = props.todoList

    if (value && value[0] !== ' ') {
      newTodoList[props.index] = value
      description.innerHTML = value
      props.todoListSetter(newTodoList)
    }

    editInput.style = 'display: none;'
    event.target.firstChild.value = ''
    view.style = 'display: block;'

    listItem.classList.toggle('editing')
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

  return (
    <li data-item-id={props.index}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={toggleElement} />
        <label>
          <span className="description">{props.todo}</span>
          <span className="created">{'created ' + date + ' ago'}</span>
        </label>
        <button className="icon icon-edit" onClick={editElement} />
        <button className="icon icon-destroy" onClick={destroyElement} />
      </div>
      <form className="edit-form" onSubmit={submitEditedElement}>
        <input type="text" className="edit" />
      </form>
    </li>
  )
}
