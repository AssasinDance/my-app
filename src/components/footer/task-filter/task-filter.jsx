import './task-filter.css'

export default function TaskFilter() {
  function toggleSelectedClass(event) {
    const previousSelected = document.querySelector('.selected')

    previousSelected.classList.toggle('selected')
    event.target.classList.toggle('selected')
  }

  function disableItems(type) {
    const todoList = document.querySelector('.todo-list')
    const listItems = todoList.children

    for (let item of listItems) {
      if (item.className === type) {
        item.style = 'display: none;'
      } else {
        item.style = 'display: block;'
      }
    }
  }

  function viewAllItems(event) {
    toggleSelectedClass(event)
    disableItems('unexistingClass')
  }

  function viewActiveItems(event) {
    toggleSelectedClass(event)
    disableItems('completed')
  }

  function viewCompletedItems(event) {
    toggleSelectedClass(event)
    disableItems('')
  }

  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={viewAllItems}>
          All
        </button>
      </li>
      <li>
        <button onClick={viewActiveItems}>Active</button>
      </li>
      <li>
        <button onClick={viewCompletedItems}>Completed</button>
      </li>
    </ul>
  )
}
