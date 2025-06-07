import './footer.css'

import TaskFilter from './task-filter/task-filter.jsx'

export default function Footer(props) {
  function clearCompleted() {
    const todoList = document.querySelector('.todo-list')
    let newTodoList = props.todoList
    const listItems = todoList.children

    for (let item of listItems) {
      if (item.className === 'completed' || item.className === 'completed editing') {
        delete newTodoList[item.getAttribute('data-item-id')]
        item.querySelector('.toggle').click()
        item.className = 'hidden'
      }
    }

    props.todoListSetter(newTodoList)
    props.setItemsLeft(newTodoList.filter((item) => item).length)
  }

  return (
    <footer className="footer">
      <span className="todo-count">{props.itemsLeft} items left</span>
      <TaskFilter />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
