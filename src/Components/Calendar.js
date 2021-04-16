import React from "react";
import styled from "styled-components";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

const CalendarWrap = styled.table`
  width: 100%;
  height: 70vh;
  th,
  td {
    border: 1px solid #ccc;
    font-size: 12px;
  }
`;

const Calendar = () => {
  return (
    <CalendarWrap>
      <CalendarHeader />
      <CalendarBody />
    </CalendarWrap>
  );
};

export default Calendar;
