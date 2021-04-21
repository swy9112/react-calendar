import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header ";
import Calendar from "./Calendar";
import CalendarEdit from "./CalendarEdit";
import moment from "moment";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  margin: auto;
`;

export const CalendarContext = React.createContext();

export default () => {
  const [calendarYM, setCalendarYM] = useState(moment());
  const [dataProp, setDataProp] = useState([]);

  const [memo, setMemo] = useState([
    { year: 2021, weekList: 15, dateIndex: 5, text: "할일이 적당해" },
    { year: 2021, weekList: 16, dateIndex: 1, text: "할일이 많아" },
    { year: 2021, weekList: 17, dateIndex: 1, text: "할일이 없어" }
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
      <Wrap>
        <Header />
        <Calendar />
      </Wrap>
      <CalendarEdit />
    </CalendarContext.Provider>
  );
};
