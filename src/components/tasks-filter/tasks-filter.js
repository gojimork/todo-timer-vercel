import PropTypes from 'prop-types';

const TasksFilter = ({ showActiveTasks, showAllTasks, showCompletedTasks, filter }) => {
  const btnProps = [
    { onClick: showAllTasks, child: 'All' },
    { onClick: showActiveTasks, child: 'Active' },
    { onClick: showCompletedTasks, child: 'Completed' },
  ];

  const filterArr = btnProps.map(({ onClick, child }) => {
    const className = filter === child ? 'selected' : '';
    return (
      <li key={child}>
        <button className={className} onClick={onClick} type="button">
          {child}
        </button>
      </li>
    );
  });

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
