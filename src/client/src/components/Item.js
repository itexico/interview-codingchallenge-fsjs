import React, { Component } from "react";
import { animateScroll } from "react-scroll";
import {
  readItems,
  createItem,
  updateItem,
  deleteItem
} from "../functions/item";

let updateListId = function(id) {
  this.setState({ listId: id }, this.getAll);
};

class Item extends Component {
  constructor() {
    super();
    this.state = {
      currentId: "",
      currentTitle: "",
      listId: "",
      items: []
    };

    updateListId = updateListId.bind(this);
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
    if (!this.state.listId) {
      return;
    }
    event.preventDefault();
    createItem(this.state.currentTitle, this.state.listId).then(() =>
      this.getAll()
    );
  };

  getAll = () => {
    if (!this.state.listId) {
      return;
    }
    readItems(this.state.listId).then(items => {
      this.setState(
        {
          currentTitle: "",
          items: [...items]
        },
        () => {
          console.log(this.state.items);
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
    updateItem(this.state.currentId, this.state.currentTitle).then(() => {
      this.getAll();
    });
  };

  onDelete = (id, event) => {
    event.preventDefault();

    const items = [...this.state.items];
    items.filter((item, index) => {
      if (item.currentId === id) {
        items.splice(index, 1);
      }
    });
    this.setState({ items: [...items] });

    deleteItem(id).then(() => {
      this.getAll();
    });
  };

  render() {
    return (
      <div className="col-md-12">
        <form className="form-margin" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="title-label" htmlFor="itemTitle">
              Item title
            </label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="itemTitle"
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
            className="btn add-icon offset-4 "
            onClick={this.onSubmit.bind(this)}
          >
            <i className="fas fa-plus mr-3" />
            Add Item
          </span>
        </form>
        <table className="table table-hover">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="col-md-6">{item.title}</td>
                <td className="col-md-6">
                  <span className="edit-icon">
                    <i
                      className="far fa-edit"
                      onClick={this.onEdit.bind(this, item._id, item.title)}
                    />
                  </span>
                  <span className="delete-icon">
                    <i
                      className="fas fa-trash-alt"
                      onClick={this.onDelete.bind(this, item._id)}
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

export default Item;
export { updateListId };
