import { useState } from 'react'

import Footer from './components/footer/footer.jsx'
import NewTaskForm from './components/new-task-form/new-task-form.jsx'
import TaskList from './components/task-list/task-list.jsx'

export default function App() {
  const [todos, setTodos] = useState([])
  const [itemsLeft, setItemsLeft] = useState(0)
  const [timers, setTimers] = useState([])

  return (
    <section className="todoapp">
      <NewTaskForm todoListSetter={setTodos} setItemsLeft={setItemsLeft} setTimers={setTimers} />
      <section className="main">
        <TaskList
          todoListSetter={setTodos}
          todoList={todos}
          itemsLeft={itemsLeft}
          setItemsLeft={setItemsLeft}
          timers={timers}
        />
        <Footer todoListSetter={setTodos} todoList={todos} itemsLeft={itemsLeft} setItemsLeft={setItemsLeft} />
      </section>
    </section>
  )
}
