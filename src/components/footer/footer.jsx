import './footer.css'

import TaskFilter from './task-filter/task-filter.jsx'

export default function Footer(props) {
  function clearCompleted() {
    let newTodos = [...props.todos]

    newTodos.forEach((todo) => {
      if (todo.completed && (todo.intervalId || todo.intervalId === 0)) clearInterval(todo.intervalId)
    })

    newTodos = newTodos.filter((todo) => !todo.completed)

    props.setTodos(newTodos)
  }

  function countItems(todos) {
    const onlyUncompleted = todos.filter((todo) => {
      return !todo.completed
    })

    return onlyUncompleted.length
  }

  return (
    <footer className="footer">
      <span className="todo-count">{countItems(props.todos)} items left</span>
      <TaskFilter currentFilter={props.currentFilter} onFilterChange={props.setCurrentFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
