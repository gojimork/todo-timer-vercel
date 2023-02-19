import { Component } from 'react';
import PropTypes from 'prop-types';

export default class EditTaskForm extends Component {
  static defaultProps = {
    description: '',
    onEditingSubmit: () => {},
    id: '',
    hiddenEditTaskForm: () => {},
  };

  static propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    hiddenEditTaskForm: PropTypes.func,
    onEditingSubmit: PropTypes.func,
  };

  state = {
    description: this.props.description,
  };

  onEditChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { onEditingSubmit, hiddenEditTaskForm, id } = this.props;
    const { description } = this.state;
    e.preventDefault();
    onEditingSubmit(id, description);
    hiddenEditTaskForm();
  };

  render() {
    return (
      <form className="editing" onSubmit={this.onSubmit}>
        <input type="text" className="edit" defaultValue={this.props.description} onChange={this.onEditChange} />
      </form>
    );
  }
}
