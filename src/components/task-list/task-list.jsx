import './task-list.css'

import Task from './task/task.jsx'

export default function TaskList(props) {
  return (
    <ul className="todo-list">
      {props.viewedTodos.map((todo, index) => {
        if (todo) {
          return (
            <Task
              key={index}
              todo={todo}
              index={index}
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
