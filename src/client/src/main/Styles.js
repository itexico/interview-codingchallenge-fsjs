import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-area:
    "header"
    "content"
    "footer";
  justify-items: center;
`;

export const Header = styled.nav`
  grid-area: header;

  nav {
    color: white;
    background: palevioletred;
  }

  nav ul {
    text-align: center;
    margin: 0;
  }

  nav ul li {
    display: inline-block;
    padding: 0 3em;
    line-height: 3em;
  }

  nav ul li:hover {
    backgound: rebeccapurple;
  }
`

export const Content = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: repeat(auto-fill, minmax(auto, 25%));
  grid-column-gap: 25px;
  grid-row-gap: 25px;
`;

export const List = styled.div`
  -webkit-box-shadow: 3px 3px 5px 6px #ddd;
  -moz-box-shadow: 3px 3px 5px 6px #ddd;
  box-shadow: 3px 3px 5px 6px #ddd;
  border: 2px solid black;
`;

/*
nav {
    width: 100%;
    color white;
    background: palevioletred 
    position: fixed;
    top: 3em;
  }

  nav ul {
    text-align: center;
    margin: 0;
  }

  nav ul li {
    display: inline-block;
    padding: 0 3em;
    line-height: 3em;
  }

  nav ul li:hover {
    backgound: rebeccapurple;
  }*/
