import React, { Component } from "react";
import "./header.component.css";

class Header extends Component {
  render() {
    return (
      <div className="header-container">
        <div className="header-title-container">
          <h1>List Builder</h1>
        </div>
      </div>
    );
  }
}

export default Header;