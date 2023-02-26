import TaskList from '../task-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './app.css';

export default class App extends Component {
  state = {
    todoData: [
      {
        id: uuidv4(),
        completed: false,
        description: 't',
        minutes: 3,
        seconds: 10,
        timeStamp: Date.parse('June 16 1993'),
      },
      // {
      //   id: uuidv4(),
      //   completed: false,
      //   description: 'Editing task',
      //   timeStamp: Date.parse('June 16 1999'),
      // },
      // { id: uuidv4(), completed: false, description: 'Active task', timeStamp: Date.parse('June 16 2010') },
    ],
    filter: 'All',
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData].filter((task) => !task.completed);
      return { todoData: newTodoData };
    });
  };

  showCompletedTasks = () => {
    this.setState({ filter: 'Completed' });
  };

  showAllTasks = () => {
    this.setState({ filter: 'All' });
  };

  showActiveTasks = () => {
    this.setState({ filter: 'Active' });
  };

  addTask = (description, minutes, seconds) => {
    const newTask = { className: '', description, minutes, seconds, id: uuidv4(), timeStamp: Date.now() };
    this.setState(({ todoData }) => ({ todoData: [newTask, ...todoData] }));
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData].filter((task) => task.id !== id);
      return {
        todoData: newTodoData,
      };
    });
  };

  onEditingSubmit = (id, description) => {
    this.setState(({ todoData }) => {
      const editedTaskIndex = todoData.findIndex((task) => task.id === id);
      const newTodoData = [...todoData];
      newTodoData[editedTaskIndex].description = description;
      return {
        todoData: newTodoData,
      };
    });
  };

  completeTask = (id) => {
    const { filter } = this.state;
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData].map((task) => {
        if (task.id === id) task.completed = !task.completed;
        return task;
      });
      return {
        todoData: newTodoData,
      };
    });
    if (filter === 'Completed') this.showCompletedTasks();
    if (filter === 'Active') this.showActiveTasks();
  };

  render() {
    const { todoData, filter } = this.state;
    const activeTasksCount = todoData.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            todoData={todoData}
            onCompleted={this.completeTask}
            onDeleted={this.deleteTask}
            onEditingSubmit={this.onEditingSubmit}
            filter={filter}
          />
          <Footer
            showActiveTasks={this.showActiveTasks}
            showAllTasks={this.showAllTasks}
            showCompletedTasks={this.showCompletedTasks}
            clearCompleted={this.clearCompleted}
            activeTasksCount={activeTasksCount}
            filter={filter}
          />
        </section>
      </section>
    );
  }
}
