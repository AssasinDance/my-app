import './task-list.css'
import Task from './task/task.js'

export default function TaskList(props) {
  return (
    <ul className="todo-list">
      {props.todoList.map((todo, index) => {
        if (todo) {
          return (
            <Task
              key={index}
              todo={todo}
              timer={props.timers[index]}
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
