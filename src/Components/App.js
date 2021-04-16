import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header ";
import Calendar from "./Calendar";
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
    <CalendarContext.Provider value={{ calendarYM, today, moveMonth, firstWeek, lastWeek, curYear }}>
      <Wrap>
        <Header />
        <Calendar />
      </Wrap>
    </CalendarContext.Provider>
  );
};
