import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import { showData, selectAll, deleteAll } from "../actions/TodoActions";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getFilteredItems = () => {
    return (this.props.mode === "active" || this.props.mode === "done"
      ?
      this.props.items.filter(e => e.status === this.props.mode) : this.props.items)
  };

  render() {
    return <div className="row">
      <div className="col-md-12">
        <ul className="">
          {this.getFilteredItems().map(item => (
            <ListItem
              key={item.id}
              item={item}
            />
          ))}
        </ul>
      <div className="btn-group col-md-offset-3">
        <button
          type="button"
          className={`btn btn-success ${this.props.mode === "all" && "active"}`}
          onClick={() => {
            this.props.showFilter("all");
          }}
        >
          All
        </button>
        <button
          type="button"
          className={`btn btn-info ${this.props.mode === "done" && "active"}`}
          onClick={() => this.props.showFilter("done")}
        >
          Done
        </button>
        <button
          type="button"
          className={`btn btn-primary ${this.props.mode === "active" && "active"}`}
          onClick={() => this.props.showFilter("active")}
        >
          Active
        </button>
        <button type="button" className="btn btn-danger" onClick={() => this.props.removeDone()}>
          Remove checked
        </button>
        <button
          type="button"
          className={`btn btn-success ${this.props.allChecked && "active"}`}
          onClick={() => this.props.chooseAll()}
        >
          <span className="glyphicon glyphicon-check" aria-hidden="true" />
        </button>
      </div>
      </div>
    </div>;
  }
}

List.propTypes = {
  mode: PropTypes.string.isRequired,
  items: PropTypes.objectOf.isRequired,
  allChecked: PropTypes.bool.isRequired,
  chooseAll: PropTypes.func.isRequired,
  showFilter: PropTypes.func.isRequired,
  removeDone: PropTypes.func.isRequired
};

List.defaultProps = {
  mode: "all",
  items: [],
  allChecked: false,
  chooseAll: () => {
  },
  showFilter: () => {
  },
  removeDone: () => {
  }
};

const mapStateToProps = state => ({
  items: state.todos.list.filter((item) => {
    if (state.todos.mode === "active") {
      return item.status === "active";
    }
    return item;
  }),
  mode: state.todos.mode,
  all: state.todos.all
});

const mapDispatchToProps = dispatch => ({
  showFilter: filter => dispatch(showData(filter)),
  chooseAll: () => dispatch(selectAll()),
  removeDone: () => dispatch(deleteAll())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
