import TasksFilter from '../tasks-filter';
import PropTypes from 'prop-types';

const Footer = ({ showActiveTasks, showAllTasks, showCompletedTasks, clearCompleted, activeTasksCount, filter }) => (
  <footer className="footer">
    <span className="todo-count">{activeTasksCount} items left</span>
    <TasksFilter
      showActiveTasks={showActiveTasks}
      showAllTasks={showAllTasks}
      showCompletedTasks={showCompletedTasks}
      filter={filter}
    />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
);

Footer.defaultProps = {
  showActiveTasks: () => {},
  showAllTasks: () => {},
  showCompletedTasks: () => {},
  clearCompleted: () => {},
  activeTasksCount: '',
  filter: 'All',
};

Footer.propTypes = {
  showActiveTasks: PropTypes.func,
  showAllTasks: PropTypes.func,
  showCompletedTasks: PropTypes.func,
  clearCompleted: PropTypes.func,
  activeTasksCount: PropTypes.number,
  filter: PropTypes.string,
};

export default Footer;
