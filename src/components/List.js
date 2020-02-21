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
      <div className="row navigation">
        <div className="btn-group col-md-offset-4 col-lg-offset-4 col-sm-offset-4 col-xs-offset-4">
          <button
            type="button"
            className={`btn btn-success button-plus ${this.props.allChecked && "active"}`}
            onClick={() => this.props.chooseAll()}
          >
            <span className="glyphicon glyphicon-check" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`btn btn-default button-plus ${this.props.mode === "all" && "active"}`}
            onClick={() => {
              this.props.showFilter("all");
            }}
          >
            All
          </button>
          <button
            type="button"
            className={`btn btn-default button-plus ${this.props.mode === "done" && "active"}`}
            onClick={() => this.props.showFilter("done")}
          >
            Done
          </button>
          <button
            type="button"
            className={`btn btn-default button-plus ${this.props.mode === "active" && "active"}`}
            onClick={() => this.props.showFilter("active")}
          >
            Active
          </button>
          <button type="button" className="btn btn-danger button-plus" onClick={() => this.props.removeDone()}>
            <span className="glyphicon glyphicon-minus" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="row">
        <ul>
          {this.getFilteredItems().map(item => (
            <ListItem
              key={item.id}
              item={item}
            />
          ))}
        </ul>
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
