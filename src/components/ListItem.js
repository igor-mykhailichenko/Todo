import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { removeTodo, doneTodo } from "../actions/TodoActions";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: ""
    };
  }

  render() {
    const isChecked = this.props.item.status === "done";

    return <div className="row list-item col-lg-offset-1">
      <div className="col-md-12">
        <div className="input-group-item inline-bloke">
          <div className="col-lg-1 checkbox-item">
            <input
              checked={isChecked}
              id={`checkbox-${this.props.item.id}`}
              type="checkbox"
              name="done"
              onChange={e => this.props.markTodo(this.props.item.id, e.target.checked)}
            />
          </div>
          <div className="col-lg-10">
              <label htmlFor={`checkbox-${this.props.item.id}`}>
                {" "}
                {this.props.item.name}
                {" "}
              </label>
          </div>
          <div className="col-lg-1">
            <button type="button" className="btn btn-danger btn-xs" onClick={() => this.props.deleteTodo(this.props.item.id)}>
              <span className="glyphicon glyphicon-remove" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.oneOf(["all", "done", "active"])
  }).isRequired,
  deleteTodo: PropTypes.func,
  markTodo: PropTypes.func
};

ListItem.defaultProps = {
  deleteTodo: () => {},
  markTodo: () => {},
  item: []
};

const mapStateToProps = state => ({
  items: state.todos.list
});

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(removeTodo(id)),
  markTodo: (id, checked) => dispatch(doneTodo(id, checked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
