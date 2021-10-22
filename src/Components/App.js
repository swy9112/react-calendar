import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import Calendar from "./Calendar/index";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  margin: auto;
`;

export default () => {
  return (
    <div>
      <Route path="/" exact />
      <Route path="/calendar" component={Calendar} />
    </div>
  );
};
