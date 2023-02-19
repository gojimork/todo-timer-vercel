import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const TasksFilter = ({ showActiveTasks, showAllTasks, showCompletedTasks, filter }) => {
  let allButtonClass = '';
  let activeButtonClass = '';
  let completeButtonClass = '';

  if (filter === 'All') {
    allButtonClass = 'selected';
  } else if (filter === 'Active') {
    activeButtonClass = 'selected';
  } else if (filter === 'Completed') {
    completeButtonClass = 'selected';
  }

  const btnProps = [
    {
      onClick: showAllTasks,
      child: 'All',
      className: allButtonClass,
    },
    {
      onClick: showActiveTasks,
      child: 'Active',
      className: activeButtonClass,
    },
    {
      onClick: showCompletedTasks,
      child: 'Completed',
      className: completeButtonClass,
    },
  ];

  const filterArr = btnProps.map(({ onClick, child, className }) => (
    <li key={uuidv4()}>
      <button className={className} onClick={onClick} type="button">
        {child}
      </button>
    </li>
  ));

  return <ul className="filters">{filterArr}</ul>;
};

TasksFilter.defaultProps = {
  showActiveTasks: () => {},
  showAllTasks: () => {},
  showCompletedTasks: () => {},
};

TasksFilter.propTypes = {
  showActiveTasks: PropTypes.func,
  showAllTasks: PropTypes.func,
  showCompletedTasks: PropTypes.func,
};

export default TasksFilter;
