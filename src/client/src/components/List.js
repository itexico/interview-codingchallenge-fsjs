import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import { updateListId } from "./Item";
import {
  readLists,
  createList,
  updateList,
  deleteList
} from "../functions/list";

class List extends Component {
  constructor() {
    super();
    this.state = {
      currentId: "",
      currentTitle: "",
      lists: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  onChange = event => {
    this.setState({ currentTitle: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    createList(this.state.currentTitle).then(() => this.getAll());
  };

  getAll = () => {
    readLists().then(lists => {
      this.setState(
        {
          currentTitle: "",
          lists: [...lists]
        },
        () => {
          console.log(this.state.lists);
        }
      );
    });
  };

  onEdit = (id, title, event) => {
    event.preventDefault();
    this.setState({
      currentId: id,
      currentTitle: title
    });
    animateScroll.scrollToTop();
  };

  onUpdate = event => {
    event.preventDefault();
    updateList(this.state.currentId, this.state.currentTitle).then(() => {
      this.getAll();
    });
  };

  onDelete = (id, event) => {
    event.preventDefault();

    const lists = [...this.state.lists];
    lists.filter((list, index) => {
      if (list.currentId === id) {
        lists.splice(index, 1);
      }
    });
    this.setState({ lists: [...lists] });

    deleteList(id).then(() => {
      this.getAll();
    });
  };

  render() {
    return (
      <div className="col-md-12">
        <form className="form-margin" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="title-label" htmlFor="listTitle">
              List title
            </label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="listTitle"
                  value={this.state.currentTitle || ""}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-3">
                <button
                  className="btn update-button"
                  onClick={this.onUpdate.bind(this)}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
          <span
            className="btn add-icon offset-4"
            onClick={this.onSubmit.bind(this)}
          >
            <i className="fas fa-plus mr-3" />
            Add List
          </span>
        </form>
        <table className="table table-hover">
          <tbody>
            {this.state.lists.map((list, index) => (
              <tr key={index}>
                <td
                  className="col-md-6 list-title"
                  onClick={event => updateListId(list._id)}
                >
                  {list.title}
                </td>
                <td className="col-md-6">
                  <span className="edit-icon">
                    <i
                      className="far fa-edit"
                      onClick={this.onEdit.bind(this, list._id, list.title)}
                    />
                  </span>
                  <span className="delete-icon">
                    <i
                      className="fas fa-trash-alt"
                      onClick={this.onDelete.bind(this, list._id)}
                    />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
