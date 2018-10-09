import "./ToDoList.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import ToDoListItem from "./ToDoListItem";

class ToDoList extends Component {
    //intial state of the form
    state = {
    name: "",
    email: "",
    addFormVisible: false,
    addFormValue: ""
    };

  //parses the input of specific lines in the form
  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  //?? submits the form i assume
  handleFormSubmit = event => {
    const { addFormValue, name, email } = this.state;
    console.log(addFormValue);
    const { addToDo } = this.props;
    event.preventDefault();
    addToDo({ name: this.state.name, email: this.state.email, title: this.state.addFormValue });
    this.setState({ addFormValue: "", name: "", email: "" });
  };


  //renders the form to the webpage
  renderAddForm = () => {
    console.log(this.state);
    const { addFormVisible, addFormValue , name, email} = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">note_add</i>

              <span>Name: <input value={name} onChange={this.handleInputChange} id="name" type="text"/></span>
              <span>Email: <input value={email} onChange={this.handleInputChange} id="email" type="text"/></span>
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="addFormValue"
                type="text"
              />

              <label htmlFor="toDoNext">Sign up</label>
            </div>
          </form>
        </div>
      );
    }
  };

  renderToDos() {
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ToDoListItem key={key} todoId={key} todo={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src="/img/nothing.png"
        />
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchToDos();
  }

  render() {
    const { addFormVisible } = this.state;
    return (
      <div className="to-do-list-container">
        <div className="row">
          {this.renderAddForm()}
          {this.renderToDos()}
        </div>
        <div className="fixed-action-btn">
          <button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
          >
            {addFormVisible ? (
              <i className="large material-icons">close</i>
            ) : (
              <i className="large material-icons">add</i>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ToDoList);
