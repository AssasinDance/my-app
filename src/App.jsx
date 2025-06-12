import { useState } from 'react'

import Footer from './components/footer/footer.jsx'
import NewTaskForm from './components/new-task-form/new-task-form.jsx'
import TaskList from './components/task-list/task-list.jsx'

export default function App() {
  const [todos, setTodos] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [itemsLeft, setItemsLeft] = useState(0)

  return (
    <section className="todoapp">
      <NewTaskForm todoListSetter={setTodos} setItemsLeft={setItemsLeft} />
      <section className="main">
        <TaskList
          currentFilter={currentFilter}
          todoListSetter={setTodos}
          todoList={todos}
          itemsLeft={itemsLeft}
          setItemsLeft={setItemsLeft}
        />
        <Footer
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
          setTodos={setTodos}
          todos={todos}
          itemsLeft={itemsLeft}
          setItemsLeft={setItemsLeft}
        />
      </section>
    </section>
  )
}
