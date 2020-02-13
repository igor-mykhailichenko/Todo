import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodo } from "../actions/TodoActions";
import List from '../components/List';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ""
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addNew(this.state.todo);
  };

  render() {
    return <div className="row">
    <div className="row header">
      <div className="page-header col-md-6 col-md-offset-3">
        <h1>ToDo</h1>
      </div>
    </div>
      <div className="col-md-6 col-md-offset-3">
        <div className="input-group">
          <input type="text"
                 className="form-control"
                 placeholder="Type task..."
                 onChange={e => this.setState({todo: e.target.value})}
          />
          <span className="input-group-btn">
            <button className="btn btn-success" type="button" onClick={this.onSubmit}>
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            </button>
          </span>
        </div>
        <List />
      </div>
    </div>;
  }
}

Todo.propTypes = {
  addNew: PropTypes.func,
};

Todo.defaultProps = {
  addNew: () => {},

};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  addNew: (todo) => dispatch(addTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo);
