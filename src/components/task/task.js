import EditTaskForm from '../edit-task-form';
import Timer from '../timer/timer';
import { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    id: '',
    description: '',
    timeStamp: '',
    onCompleted: () => {},
    onDeleted: () => {},
    onEditingSubmit: () => {},
  };

  static propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    timeStamp: PropTypes.number,
    onCompleted: PropTypes.func,
    onDeleted: PropTypes.func,
    onEditingSubmit: PropTypes.func,
  };

  state = { edit: false };

  onEditedClick = () => {
    this.setState({ edit: true });
  };

  hiddenEditTaskForm = () => {
    this.setState({ edit: false });
  };

  render() {
    const { id, description, minutes, seconds, timeStamp, onCompleted, onDeleted, onEditingSubmit } = this.props;
    const { edit } = this.state;
    if (edit) {
      return (
        <EditTaskForm
          description={description}
          onEditingSubmit={onEditingSubmit}
          id={id}
          hiddenEditTaskForm={this.hiddenEditTaskForm}
        />
      );
    }
    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} />
        <label>
          <span className="description">{description}</span>
          <Timer seconds={seconds} minutes={minutes} />
          <span className="created">{formatDistanceToNow(timeStamp, { addSuffix: true })}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={this.onEditedClick} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
