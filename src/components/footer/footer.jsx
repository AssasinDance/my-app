import './footer.css'
import { useState, useEffect } from 'react'

import TaskFilter from './task-filter/task-filter.jsx'

export default function Footer(props) {
  const [currentFilter, setCurrentFilter] = useState('all')

  function clearCompleted() {
    let newTodos = [...props.todos]

    newTodos = newTodos.filter((todo) => !todo.completed)

    props.setTodos(newTodos)
  }

  useEffect(() => {
    switch (currentFilter) {
      case 'active':
        return props.setViewedTodos(props.todos.filter((task) => !task.completed))
      case 'completed':
        return props.setViewedTodos(props.todos.filter((task) => task.completed))
      default:
        return props.setViewedTodos(props.todos)
    }
  }, [currentFilter, props.todos])

  function countItems(todos) {
    const onlyUncompleted = todos.filter((todo) => {
      return !todo.completed
    })

    return onlyUncompleted.length
  }

  return (
    <footer className="footer">
      <span className="todo-count">{countItems(props.todos)} items left</span>
      <TaskFilter currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
