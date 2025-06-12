import './task-list.css'

import Task from './task/task.jsx'

export default function TaskList(props) {
  return (
    <ul className="todo-list">
      {props.todoList
        .filter((todo) => {
          switch (props.currentFilter) {
            case 'active':
              return !todo.completed
            case 'completed':
              return todo.completed
            default:
              return true
          }
        })
        .map((todo) => {
          if (todo) {
            return (
              <Task
                key={todo.id}
                todo={todo}
                id={todo.id}
                todoListSetter={props.todoListSetter}
                todoList={props.todoList}
                itemsLeft={props.itemsLeft}
                setItemsLeft={props.setItemsLeft}
              />
            )
          }
        })}
    </ul>
  )
}
