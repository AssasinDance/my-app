import { useState } from 'react'

import Footer from './components/footer/footer.js'
import NewTaskForm from './components/new-task-form/new-task-form.js'
import TaskList from './components/task-list/task-list.js'

export default function App() {
  const [todos, setTodos] = useState([])
  const [itemsLeft, setItemsLeft] = useState(0)

  return (
    <section className="todoapp">
      <NewTaskForm todoListSetter={setTodos} todoList={todos} itemsLeft={itemsLeft} setItemsLeft={setItemsLeft} />
      <section className="main">
        <TaskList todoListSetter={setTodos} todoList={todos} itemsLeft={itemsLeft} setItemsLeft={setItemsLeft} />
        <Footer todoListSetter={setTodos} todoList={todos} itemsLeft={itemsLeft} setItemsLeft={setItemsLeft} />
      </section>
    </section>
  )
}
