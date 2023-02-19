import { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: PropTypes.func,
  };

  state = {
    description: '',
    seconds: '',
    minutes: '',
  };

  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  };

  onAddSubmit = (e) => {
    e.preventDefault();
    const { description, minutes, seconds } = this.state;
    if (description) {
      this.props.addTask(description, minutes, seconds);
      this.setState({ description: '', minutes: '', seconds: '' });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;
    return (
      <form onSubmit={this.onAddSubmit}>
        <ul className="task-form">
          <li>
            <input className="new-todo" placeholder="Task" onChange={this.onDescriptionChange} value={description} />
          </li>
          <li>
            <input
              className="new-todo"
              type="number"
              placeholder="Min"
              onChange={this.onMinutesChange}
              value={minutes}
            />
          </li>
          <li>
            <input
              className="new-todo"
              type="number"
              placeholder="Sec"
              onChange={this.onSecondsChange}
              value={seconds}
            />
          </li>
        </ul>
        <button type="submit" />
      </form>
    );
  }
}
