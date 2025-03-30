import './new-task-form.css'

export default function NewTaskForm(props) {
  function addTask(event) {
    event.preventDefault()

    if (event.target.firstChild.value && event.target.firstChild.value[0] !== ' ') {
      props.todoListSetter([...props.todoList, event.target.firstChild.value])
      props.setItemsLeft(props.itemsLeft + 1)
    }

    event.target.firstChild.value = ''
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={addTask} className="new-todo-form">
        <input className="new-todo" placeholder="What needs to be done?" autoFocus="" />
      </form>
    </header>
  )
}
