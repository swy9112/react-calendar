import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";
import CalendarControl from "./CalendarControl";
import CalendarEdit from "./CalendarEdit";

const CalendarWrap = styled.table`
  width: 100%;
  max-width: 1024px;
  margin: auto;
  th,
  td {
    border: 1px solid #ccc;
    font-size: 12px;
  }
`;

export const CalendarContext = React.createContext();

const Calendar = () => {
  const [calendarYM, setCalendarYM] = useState(moment());
  const [dataProp, setDataProp] = useState([]);

  const [memo, setMemo] = useState([
    { year: 2021, weekList: 37, dateIndex: 5, text: "할일이 적당해" },
    { year: 2021, weekList: 38, dateIndex: 1, text: "할일이 많아" },
    { year: 2021, weekList: 39, dateIndex: 1, text: "할일이 없어" }
  ]);
  const today = calendarYM;

  const moveMonth = month => {
    setCalendarYM(calendarYM.clone().add(month, "M"));
  };

  const curYear = Number(today.format("Y"));

  const firstWeek = today
    .clone()
    .startOf("month")
    .week();
  const lastWeek =
    today
      .clone()
      .endOf("month")
      .week() === 1
      ? 53
      : today
          .clone()
          .endOf("month")
          .week();

  return (
    <CalendarContext.Provider
      value={{ calendarYM, today, moveMonth, firstWeek, lastWeek, curYear, memo, setMemo, dataProp, setDataProp }}
    >
      <CalendarControl />
      <CalendarWrap>
        <CalendarHeader />
        <CalendarBody />
      </CalendarWrap>
      <CalendarEdit />
    </CalendarContext.Provider>
  );
};

export default Calendar;
